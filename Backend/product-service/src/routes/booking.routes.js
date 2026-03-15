const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// ==================== USER ROUTES (Authenticated Users) ====================

// Create a new booking
router.post(
  '/',
  authMiddleware.authenticate,
  bookingController.createBooking
);

// Get my bookings (for users)
router.get(
  '/my-bookings',
  authMiddleware.authenticate,
  bookingController.getMyBookings
);

// Get booking details
router.get(
  '/:bookingId',
  authMiddleware.authenticate,
  bookingController.getBookingDetails
);

// Cancel booking (user or provider)
router.post(
  '/:bookingId/cancel',
  authMiddleware.authenticate,
  bookingController.cancelBooking
);

// Process payment
router.post(
  '/:bookingId/payment',
  authMiddleware.authenticate,
  bookingController.processPayment
);

// ==================== PROVIDER ROUTES ====================

// Get provider bookings
router.get(
  '/provider/bookings',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  bookingController.getProviderBookings
);

// Get today's schedule
router.get(
  '/provider/today',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  bookingController.getTodaySchedule
);

// Confirm booking (provider)
router.post(
  '/:bookingId/confirm',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  bookingController.confirmBooking
);

// Mark booking as completed
router.post(
  '/:bookingId/complete',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  bookingController.completeBooking
);

// Get booking stats
router.get(
  '/provider/stats',
  authMiddleware.authenticate,
  roleMiddleware.checkRole(['provider', 'admin']),
  bookingController.getProviderBookingStats
);

module.exports = router;