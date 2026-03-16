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

      const { serviceId, slotId, timeSlotId, participants = 1, userId } = bookingData;

      const service = await Service.findById(serviceId).session(session);

      if (!service || service.status !== 'active') {
        throw new Error('Service not available');
      }

      const slot = await Slot.findById(slotId).session(session);

      if (!slot) {
        throw new Error('Slot not found');
      }

      const timeSlot = slot.timeSlots.id(timeSlotId);

      if (!timeSlot) {
        throw new Error('Time slot not found');
      }

      if (timeSlot.capacity.booked + participants > timeSlot.capacity.max) {
        throw new Error('Not enough capacity in this slot');
      }

      const basePrice = service.pricing.basePrice;

      const serviceFee = this.calculateServiceFee(basePrice);
      const taxes = this.calculateTaxes(basePrice);

      const totalAmount = (basePrice + serviceFee + taxes) * participants;

      const booking = new Booking({

        userId,
        serviceId,
        slotId,
        timeSlotId,

        providerId: service.providerId,

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

        paymentStatus: "pending",
        status: "pending_payment"

      });

      await booking.save({ session });

      await Slot.bookTimeSlot(
        slotId,
        timeSlotId,
        booking._id,
        participants,
        session
      );

      await service.incrementBooking(session);

      await session.commitTransaction();
      session.endSession();

      await this.sendBookingNotifications(booking);

      return booking;

    } catch (error) {

      await session.abortTransaction();
      session.endSession();

      throw new Error(`Booking failed: ${error.message}`);
    }
  }

  // ================= PAYMENT SUCCESS =================

  async markBookingPaid(bookingId, paymentData) {

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.paymentStatus === "paid") {
      return booking;
    }

    booking.paymentStatus = "paid";

    booking.payment = {
      transactionId: paymentData.transactionId,
      method: paymentData.method,
      paidAt: new Date()
    };

    booking.status = "confirmed";
    booking.confirmedAt = new Date();
    booking.confirmedBy = "payment_system";

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

  // ================= PROVIDER CONFIRM =================

  async confirmBooking(bookingId, providerId) {

    const booking = await Booking.findOne({
      _id: bookingId,
      providerId
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== 'pending_payment') {
      throw new Error('Booking cannot be confirmed yet');
    }

    booking.status = 'confirmed';
    booking.confirmedAt = new Date();
    booking.confirmedBy = providerId;

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

      if (!['pending_payment', 'confirmed'].includes(booking.status)) {
        throw new Error('Booking cannot be cancelled');
      }

      const isUser = cancelledBy.startsWith('user');

      booking.status = isUser
        ? 'cancelled_by_user'
        : 'cancelled_by_provider';

      booking.cancellation = {
        cancelledAt: new Date(),
        cancelledBy,
        reason
      };

      await booking.save({ session });

      await Slot.releaseTimeSlot(
        booking.slotId,
        booking.timeSlotId,
        booking._id,
        session
      );

      await session.commitTransaction();
      session.endSession();

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

    if (booking.status !== 'confirmed') {
      throw new Error('Booking not confirmed yet');
    }

    booking.status = 'completed';

    await booking.save();

    await Service.findByIdAndUpdate(
      booking.serviceId,
      { $inc: { completedBookings: 1 } }
    );

    return booking;
  }

  // ================= PRICING =================

  calculateServiceFee(price) {
    return Math.round(price * 0.05);
  }

  calculateTaxes(price) {
    return Math.round(price * 0.18);
  }

  // ================= NOTIFICATIONS =================

  async sendBookingNotifications(booking) {

    console.log('Booking created:', booking._id);

    booking.notifications = booking.notifications || [];

    booking.notifications.push({
      type: 'system',
      sentAt: new Date(),
      message: 'Booking created'
    });

    await booking.save();
  }

  async sendConfirmationNotification(booking) {

    console.log('Booking confirmed:', booking._id);

    booking.notifications = booking.notifications || [];

    booking.notifications.push({
      type: 'system',
      sentAt: new Date(),
      message: 'Booking confirmed'
    });

    await booking.save();
  }

  async sendCancellationNotification(booking) {

    console.log('Booking cancelled:', booking._id);

    booking.notifications = booking.notifications || [];

    booking.notifications.push({
      type: 'system',
      sentAt: new Date(),
      message: 'Booking cancelled'
    });

    await booking.save();
  }

}

module.exports = new BookingService();