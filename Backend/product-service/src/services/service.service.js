const Service = require('../models/Service');
const Slot = require('../models/Slot');
const { cloudinary } = require('../config/cloudinary');
const moderationService = require('./moderation.service');

class ServiceService {

  // ================= SERVICE CRUD =================

  async createService(serviceData, files = []) {
    try {

      const images = [];

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {

          const result = await cloudinary.uploader.upload(files[i].path, {
            folder: "unikart/services",
            resource_type: "auto"
          });

          images.push({
            url: result.secure_url,
            publicId: result.public_id,
            isPrimary: i === 0
          });
        }
      }

      const service = new Service({
        ...serviceData,
        images,
        status: "pending_approval"
      });

      const moderationResult = await moderationService.moderateContent({
        title: serviceData.title,
        description: serviceData.description
      });

      if (moderationResult.flagged) {
        service.status = "rejected";
        service.rejectionReason = "Inappropriate content detected";
      }

      await service.save();

      return service;

    } catch (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }
  }



  async getServiceById(serviceId, incrementView = false) {

    const service = await Service.findById(serviceId);

    if (!service || !service.isActive) {
      throw new Error("Service not found");
    }

    if (incrementView && service.incrementViews) {
      await service.incrementViews();
    }

    return service;
  }



  async updateService(serviceId, providerId, updateData, files = []) {

    const service = await Service.findOne({
      _id: serviceId,
      providerId
    });

    if (!service) {
      throw new Error("Service not found or unauthorized");
    }

    // Handle images
    if (files.length > 0) {

      for (const img of service.images) {
        if (img.publicId) {
          await cloudinary.uploader.destroy(img.publicId);
        }
      }

      const newImages = [];

      for (let i = 0; i < files.length; i++) {

        const result = await cloudinary.uploader.upload(files[i].path, {
          folder: "unikart/services"
        });

        newImages.push({
          url: result.secure_url,
          publicId: result.public_id,
          isPrimary: i === 0
        });
      }

      updateData.images = newImages;
    }

    // Re-moderate if text changed
    if (updateData.title || updateData.description) {

      updateData.status = "pending_approval";

      const moderationResult = await moderationService.moderateContent({
        title: updateData.title || service.title,
        description: updateData.description || service.description
      });

      if (moderationResult.flagged) {
        updateData.status = "rejected";
        updateData.rejectionReason = "Inappropriate content detected";
      }
    }

    Object.assign(service, updateData);

    await service.save();

    return service;
  }



  async deleteService(serviceId, providerId) {

    const service = await Service.findOne({
      _id: serviceId,
      providerId
    });

    if (!service) {
      throw new Error("Service not found or unauthorized");
    }

    service.isActive = false;

    await service.save();

    for (const img of service.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    return { message: "Service deleted successfully" };
  }



  // ================= SERVICE LISTING =================

  async listServices(filters = {}, page = 1, limit = 20) {

    const {
      category,
      serviceType,
      venue,
      minPrice,
      maxPrice,
      searchQuery,
      providerId,
      status = "active"
    } = filters;

    const query = {
      isActive: true,
      status
    };

    if (category) query.category = category;

    if (serviceType) query.serviceType = serviceType;

    if (venue) query["location.venue"] = new RegExp(venue, "i");

    if (providerId) query.providerId = providerId;

    if (minPrice || maxPrice) {

      query["pricing.basePrice"] = {};

      if (minPrice) query["pricing.basePrice"].$gte = minPrice;

      if (maxPrice) query["pricing.basePrice"].$lte = maxPrice;
    }

    if (searchQuery) {
      query.$or = [
        { title: new RegExp(searchQuery, "i") },
        { description: new RegExp(searchQuery, "i") }
      ];
    }

    const skip = (page - 1) * limit;

    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Service.countDocuments(query);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }



  // ================= ADMIN =================

  async approveService(serviceId, adminId, adminName) {

    const service = await Service.findById(serviceId);

    if (!service) {
      throw new Error("Service not found");
    }

    service.status = "active";

    service.approvedBy = {
      adminId,
      adminName,
      approvedAt: new Date()
    };

    await service.save();

    return service;
  }



  async rejectService(serviceId, reason) {

    const service = await Service.findById(serviceId);

    if (!service) {
      throw new Error("Service not found");
    }

    service.status = "rejected";

    service.rejectionReason = reason;

    await service.save();

    return service;
  }



  // ================= SLOT MANAGEMENT =================

  async createSlot(serviceId, providerId, slotData) {

    const service = await Service.findOne({
      _id: serviceId,
      providerId
    });

    if (!service) {
      throw new Error("Service not found or unauthorized");
    }

    const slot = new Slot({
      serviceId,
      providerId,
      ...slotData
    });

    await slot.save();

    return slot;
  }



  async getServiceSlots(serviceId, startDate, endDate) {

    const start = new Date(startDate);

    const end = new Date(endDate);

    const slots = await Slot.find({
      serviceId,
      date: { $gte: start, $lte: end },
      isActive: true
    }).sort({ date: 1 });

    return slots;
  }



  async deleteSlot(slotId, providerId) {

    const slot = await Slot.findOne({
      _id: slotId,
      providerId
    });

    if (!slot) {
      throw new Error("Slot not found or unauthorized");
    }

    const hasBookings = slot.timeSlots.some(
      ts => ts.capacity.booked > 0
    );

    if (hasBookings) {
      throw new Error("Cannot delete slot with bookings");
    }

    await Slot.deleteOne({ _id: slotId });

    return { message: "Slot deleted successfully" };
  }



  // ================= PROVIDER STATS =================

  async getProviderStats(providerId) {

    const totalServices = await Service.countDocuments({
      providerId
    });

    const activeServices = await Service.countDocuments({
      providerId,
      status: "active"
    });

    const pendingServices = await Service.countDocuments({
      providerId,
      status: "pending_approval"
    });

    const services = await Service.find({ providerId });

    const totalViews = services.reduce(
      (sum, s) => sum + (s.views || 0),
      0
    );

    return {
      totalServices,
      activeServices,
      pendingServices,
      totalViews
    };
  }

}

module.exports = new ServiceService();