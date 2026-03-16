const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  createBooking,
  getMyBookings,
  getBookingDetails,
  cancelBooking,
  getProviderBookings,
  getTodaySchedule,
  confirmBooking,
  completeBooking,
  getProviderBookingStats
} = require("../controllers/booking.controller");


// ── Create booking (Buyer/User) ─────────────────────────────
router.post(
  "/",
  authMiddleware,
  createBooking
);


// ── User booking routes ─────────────────────────────────────
router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

router.get(
  "/:bookingId",
  authMiddleware,
  getBookingDetails
);

router.post(
  "/:bookingId/cancel",
  authMiddleware,
  cancelBooking
);


// ── Provider / Seller routes ────────────────────────────────
router.get(
  "/provider/bookings",
  authMiddleware,
  roleMiddleware("SELLER"),
  getProviderBookings
);

router.get(
  "/provider/today",
  authMiddleware,
  roleMiddleware("SELLER"),
  getTodaySchedule
);

router.post(
  "/:bookingId/confirm",
  authMiddleware,
  roleMiddleware("SELLER"),
  confirmBooking
);

router.post(
  "/:bookingId/complete",
  authMiddleware,
  roleMiddleware("SELLER"),
  completeBooking
);

router.get(
  "/provider/stats",
  authMiddleware,
  roleMiddleware("SELLER"),
  getProviderBookingStats
);


module.exports = router;