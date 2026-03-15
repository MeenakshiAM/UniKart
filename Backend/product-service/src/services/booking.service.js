const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Slot = require('../models/Slot');
const mongoose = require('mongoose');

class BookingService {

  // ================= BOOKING CREATION =================

  async createBooking(bookingData) {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

      const { serviceId, slotId, timeSlotId, userId, participants = 1 } = bookingData;

      // 1. Fetch service
      const service = await Service.findById(serviceId).session(session);

      if (!service || service.status !== 'active') {
        throw new Error('Service not available');
      }

      // 2. Fetch slot
      const slot = await Slot.findById(slotId).session(session);

      if (!slot) {
        throw new Error('Slot not found');
      }

      // 3. Find timeslot
      const timeSlot = slot.timeSlots.id(timeSlotId);

      if (!timeSlot) {
        throw new Error('Time slot not found');
      }

      // 4. Capacity check
      const remainingCapacity = timeSlot.capacity.max - timeSlot.capacity.booked;

      if (remainingCapacity <= 0) {
        throw new Error('Slot fully booked');
      }

      if (participants > remainingCapacity) {
        throw new Error(`Only ${remainingCapacity} spots remaining`);
      }

      // 5. Pricing
      const basePrice = service.pricing.basePrice;
      const serviceFee = this.calculateServiceFee(basePrice);
      const taxes = this.calculateTaxes(basePrice);

      const totalAmount = (basePrice + serviceFee + taxes) * participants;

      // 6. Create booking
      const booking = new Booking({
        ...bookingData,

        providerId: service.providerId,
        providerName: service.providerName,
        providerEmail: service.providerEmail,

        bookingDate: slot.date,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,

        participants,

        pricing: {
          basePrice,
          serviceFee,
          taxes,
          totalAmount
        },

        status: service.bookingSettings.autoAcceptBooking ? 'confirmed' : 'pending',
        autoAccepted: service.bookingSettings.autoAcceptBooking
      });

      await booking.save({ session });

      // 7. Update slot capacity
      await slot.bookSlot(timeSlotId, booking._id, participants, session);

      // 8. Update service stats
      await service.incrementBooking(session);

      // 9. Auto confirmation
      if (service.bookingSettings.autoAcceptBooking) {

        booking.confirmedAt = new Date();
        booking.confirmedBy = 'system';

        booking.postBookingDetailsRevealed = true;

        booking.revealedDetails = {
          ...service.postBookingDetails,
          revealedAt: new Date()
        };

        await booking.save({ session });

      }

      await session.commitTransaction();
      session.endSession();

      await this.sendBookingNotifications(booking, service);

      return booking;

    } catch (error) {

      await session.abortTransaction();
      session.endSession();

      throw new Error(`Booking failed: ${error.message}`);
    }
  }

  // ================= CONFIRM BOOKING =================

  async confirmBooking(bookingId, providerId) {

    const booking = await Booking.findOne({
      _id: bookingId,
      providerId
    });

    if (!booking) {
      throw new Error('Booking not found or unauthorized');
    }

    if (booking.status !== 'pending') {
      throw new Error('Booking cannot be confirmed');
    }

    booking.status = 'confirmed';
    booking.confirmedAt = new Date();
    booking.confirmedBy = providerId;

    const service = await Service.findById(booking.serviceId);

    if (service?.postBookingDetails) {

      booking.postBookingDetailsRevealed = true;

      booking.revealedDetails = {
        ...service.postBookingDetails,
        revealedAt: new Date()
      };

    }

    await booking.save();

    await this.sendConfirmationNotification(booking);

    return booking;
  }

  // ================= CANCEL BOOKING =================

  async cancelBooking(bookingId, cancelledBy, reason = '') {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

      const booking = await Booking.findById(bookingId).session(session);

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (!['pending', 'confirmed', 'payment_completed'].includes(booking.status)) {
        throw new Error('Booking cannot be cancelled');
      }

      const service = await Service.findById(booking.serviceId).session(session);

      const refundAmount = this.calculateRefund(booking, service);

      const isUser = cancelledBy.startsWith('user');

      booking.status = isUser
        ? 'cancelled_by_user'
        : 'cancelled_by_provider';

      booking.cancellation = {
        cancelledAt: new Date(),
        cancelledBy,
        reason,
        refundEligible: refundAmount > 0,
        refundAmount
      };

      await booking.save({ session });

      // release slot
      const slot = await Slot.findById(booking.slotId).session(session);

      if (slot) {
        await slot.releaseSlot(booking.timeSlotId, booking.participants, session);
      }

      // decrement service bookings
      if (service) {
        await service.decrementBooking(session);
      }

      await session.commitTransaction();
      session.endSession();

      if (refundAmount > 0) {
        await this.processRefund(booking, refundAmount);
      }

      await this.sendCancellationNotification(booking);

      return booking;

    } catch (error) {

      await session.abortTransaction();
      session.endSession();

      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  }

  // ================= COMPLETE BOOKING =================

  async completeBooking(bookingId, providerId) {

    const booking = await Booking.findOne({
      _id: bookingId,
      providerId
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'completed';

    await booking.save();

    await Service.findByIdAndUpdate(
      booking.serviceId,
      { $inc: { completedBookings: 1 } }
    );

    return booking;
  }

  // ================= PAYMENT =================

  async processPayment(bookingId, paymentDetails) {

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.payment = {
      status: 'completed',
      method: paymentDetails.method,
      transactionId: paymentDetails.transactionId,
      paidAt: new Date()
    };

    booking.status = 'payment_completed';

    await booking.save();

    return booking;
  }

  async processRefund(booking, refundAmount) {

    booking.payment.status = 'refunded';
    booking.payment.refundedAt = new Date();
    booking.payment.refundAmount = refundAmount;

    booking.status = 'refunded';

    await booking.save();

    return { success: true };
  }

  // ================= PRICING =================

  calculateServiceFee(price) {
    return Math.round(price * 0.05);
  }

  calculateTaxes(price) {
    return Math.round(price * 0.18);
  }

  calculateRefund(booking, service) {

    if (booking.payment.status !== 'completed') {
      return 0;
    }

    const bookingDate = new Date(booking.bookingDate);
    const now = new Date();

    const hours = (bookingDate - now) / (1000 * 60 * 60);

    const policy = service?.bookingSettings?.cancellationPolicy || 'moderate';

    if (policy === 'flexible' && hours > 24) {
      return booking.pricing.totalAmount;
    }

    if (policy === 'moderate' && hours > 12) {
      return Math.round(booking.pricing.totalAmount * 0.5);
    }

    return 0;
  }

  // ================= NOTIFICATIONS =================

  async sendBookingNotifications(booking) {

    console.log('Booking notification', booking._id);

    booking.notifications.push({
      type: 'email',
      sentAt: new Date(),
      status: 'sent',
      message: 'Booking confirmation'
    });

    await booking.save();
  }

  async sendConfirmationNotification(booking) {

    console.log('Confirmation sent', booking._id);

    booking.notifications.push({
      type: 'email',
      sentAt: new Date(),
      status: 'sent',
      message: 'Booking confirmed'
    });

    await booking.save();
  }

  async sendCancellationNotification(booking) {

    console.log('Cancellation sent', booking._id);

    booking.notifications.push({
      type: 'email',
      sentAt: new Date(),
      status: 'sent',
      message: 'Booking cancelled'
    });

    await booking.save();
  }

}

module.exports = new BookingService();