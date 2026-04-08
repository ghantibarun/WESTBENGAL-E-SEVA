const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required']
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Absent', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

appointmentSchema.index({ department: 1, appointmentDate: 1, timeSlot: 1 });
appointmentSchema.index({ user: 1, appointmentDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);