const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String, // Example: "09:00"
    required: true
  },

  endTime: {
    type: String, // Example: "10:00"
    required: true
  },

  status: {
    type: String,
    enum: ["available", "booked", "blocked"],
    default: "available"
  },

  // Multiple bookings can exist if capacity > 1
  bookingIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    }
  ],

  capacity: {
    max: {
      type: Number,
      default: 1 // provider decides this
    },
    booked: {
      type: Number,
      default: 0
    }
  }

}, { _id: true });


const slotSchema = new mongoose.Schema({

  // Service reference
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
    index: true
  },

  // Provider reference
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  // Date of slots
  date: {
    type: Date,
    required: true,
    index: true
  },

  // Provider defines number of slots
  timeSlots: [timeSlotSchema],

  // Recurring slots (optional feature)
  isRecurring: {
    type: Boolean,
    default: false
  },

  recurringPattern: {
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "none"],
      default: "none"
    },

    endDate: Date,

    daysOfWeek: [Number] // 0=Sunday
  },

  // Slot activation control
  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});


// Indexes for faster queries
slotSchema.index({ serviceId: 1, date: 1 });
slotSchema.index({ providerId: 1, date: 1 });
slotSchema.index({ date: 1, "timeSlots.status": 1 });


// Book slot method
slotSchema.methods.bookSlot = function (timeSlotId, bookingId) {

  const slot = this.timeSlots.id(timeSlotId);

  if (!slot) {
    throw new Error("Time slot not found");
  }

  if (slot.capacity.booked >= slot.capacity.max) {
    throw new Error("Slot fully booked");
  }

  slot.capacity.booked += 1;
  slot.bookingIds.push(bookingId);

  if (slot.capacity.booked >= slot.capacity.max) {
    slot.status = "booked";
  }

  return this.save();
};


// Release slot (for cancellations)
slotSchema.methods.releaseSlot = function (timeSlotId, bookingId) {

  const slot = this.timeSlots.id(timeSlotId);

  if (!slot) {
    throw new Error("Time slot not found");
  }

  if (slot.capacity.booked > 0) {
    slot.capacity.booked -= 1;
  }

  slot.bookingIds = slot.bookingIds.filter(
    id => id.toString() !== bookingId.toString()
  );

  if (slot.capacity.booked < slot.capacity.max) {
    slot.status = "available";
  }

  return this.save();
};


// Get available slots
slotSchema.methods.getAvailableSlots = function () {
  return this.timeSlots.filter(
    slot => slot.capacity.booked < slot.capacity.max
  );
};


// Static method to find available slots
slotSchema.statics.findAvailableSlots = function (serviceId, startDate, endDate) {

  return this.find({
    serviceId,
    date: { $gte: startDate, $lte: endDate },
    isActive: true
  }).sort({ date: 1 });

};


module.exports = mongoose.model("Slot", slotSchema);