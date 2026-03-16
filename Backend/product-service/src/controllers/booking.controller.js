const bookingService = require("../services/booking.service");

// ==================== CREATE BOOKING ====================
exports.createBooking = async (req, res) => {
  try {

    const bookingData = {
      ...req.body,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      userPhone: req.user.phone || req.body.userPhone
    };

    const booking = await bookingService.createBooking(bookingData);

    return res.status(201).json({
      success: true,
      message: booking.autoAccepted
        ? "Booking confirmed automatically"
        : "Booking created. Awaiting provider confirmation.",
      data: booking
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== CONFIRM BOOKING ====================
exports.confirmBooking = async (req, res) => {
  try {

    const { bookingId } = req.params;
    const providerId = req.user.id;

    const booking = await bookingService.confirmBooking(
      bookingId,
      providerId
    );

    return res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== CANCEL BOOKING ====================
exports.cancelBooking = async (req, res) => {
  try {

    const { bookingId } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Cancellation reason is required"
      });
    }

    const cancelledBy =
      req.user.role === "SELLER"
        ? req.user.id
        : `user_${req.user.id}`;

    const booking = await bookingService.cancelBooking(
      bookingId,
      cancelledBy,
      reason
    );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== COMPLETE BOOKING ====================
exports.completeBooking = async (req, res) => {
  try {

    const { bookingId } = req.params;
    const providerId = req.user.id;

    const booking = await bookingService.completeBooking(
      bookingId,
      providerId
    );

    return res.status(200).json({
      success: true,
      message: "Booking marked as completed",
      data: booking
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== USER BOOKINGS ====================
exports.getMyBookings = async (req, res) => {
  try {

    const userId = req.user.id;

    const filters = {
      status: req.query.status,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20
    };

    const result = await bookingService.getUserBookings(userId, filters);

    return res.status(200).json({
      success: true,
      data: result.bookings,
      pagination: result.pagination
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== PROVIDER BOOKINGS ====================
exports.getProviderBookings = async (req, res) => {
  try {

    const providerId = req.user.id;

    const filters = {
      status: req.query.status,
      date: req.query.date,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20
    };

    const result = await bookingService.getProviderBookings(
      providerId,
      filters
    );

    return res.status(200).json({
      success: true,
      data: result.bookings,
      pagination: result.pagination
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== PROVIDER TODAY SCHEDULE ====================
exports.getTodaySchedule = async (req, res) => {
  try {

    const providerId = req.user.id;

    const bookings = await bookingService.getTodaySchedule(providerId);

    return res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== BOOKING DETAILS ====================
exports.getBookingDetails = async (req, res) => {
  try {

    const { bookingId } = req.params;

    const userId =
      req.user.role === "BUYER" ? req.user.id : null;

    const providerId =
      req.user.role === "SELLER" ? req.user.id : null;

    const booking = await bookingService.getBookingById(
      bookingId,
      userId,
      providerId
    );

    return res.status(200).json({
      success: true,
      data: booking
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message
    });

  }
};



// ==================== PROVIDER BOOKING STATS ====================
exports.getProviderBookingStats = async (req, res) => {
  try {

    const providerId = req.user.id;

    const stats = await bookingService.getProviderBookingStats(providerId);

    return res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};