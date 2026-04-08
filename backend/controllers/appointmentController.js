const Appointment = require('../models/Appointment');
const Department = require('../models/Department');
const asyncHandler = require('../middleware/asyncHandler');

const DEFAULT_TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM'
];

const MAX_APPOINTMENTS_PER_SLOT = 1;

const normalizeDateOnly = (input) => {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

const getTodayUtcDateOnly = () => normalizeDateOnly(new Date());

const createAppointment = asyncHandler(async (req, res) => {
  const { departmentId, serviceType, appointmentDate, timeSlot } = req.body;

  if (!req.user?.id) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const normalizedDate = normalizeDateOnly(appointmentDate);

  if (!normalizedDate) {
    return res.status(400).json({ message: 'A valid appointment date is required' });
  }

  const todayDate = getTodayUtcDateOnly();

  if (normalizedDate.getTime() <= todayDate.getTime()) {
    return res.status(400).json({ message: 'Appointments can only be booked from the next day onward' });
  }

  if (!DEFAULT_TIME_SLOTS.includes(timeSlot)) {
    return res.status(400).json({ message: 'Please choose a valid time slot' });
  }

  const department = await Department.findById(departmentId);

  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }

  const liveAppointment = await Appointment.findOne({
    user: req.user.id,
    status: 'Pending'
  });

  if (liveAppointment) {
    return res.status(409).json({ message: 'You can only keep one live appointment at a time' });
  }

  const existingAppointment = await Appointment.findOne({
    user: req.user.id,
    department: departmentId,
    appointmentDate: normalizedDate,
    timeSlot,
    status: { $ne: 'Cancelled' }
  });

  if (existingAppointment) {
    return res.status(409).json({ message: 'You already have a booking for this slot' });
  }

  const slotCount = await Appointment.countDocuments({
    department: departmentId,
    appointmentDate: normalizedDate,
    timeSlot,
    status: { $ne: 'Cancelled' }
  });

  if (slotCount >= MAX_APPOINTMENTS_PER_SLOT) {
    return res.status(409).json({ message: 'Selected slot is fully booked' });
  }

  const appointment = await Appointment.create({
    user: req.user.id,
    department: departmentId,
    serviceType,
    appointmentDate: normalizedDate,
    timeSlot,
    status: 'Pending'
  });

  const populatedAppointment = await appointment.populate('user department');

  res.status(201).json({
    message: 'Appointment created successfully',
    appointment: populatedAppointment
  });
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate('user', 'name email phoneNumber role')
    .populate('department', 'name location')
    .sort({ appointmentDate: 1, timeSlot: 1, createdAt: 1 });

  res.status(200).json({ appointments });
});

const getAvailableSlots = asyncHandler(async (req, res) => {
  const { departmentId, date } = req.query;
  const normalizedDate = normalizeDateOnly(date);

  if (!departmentId) {
    return res.status(400).json({ message: 'departmentId is required' });
  }

  if (!normalizedDate) {
    return res.status(400).json({ message: 'A valid date is required' });
  }

  const todayDate = getTodayUtcDateOnly();

  if (normalizedDate.getTime() <= todayDate.getTime()) {
    return res.status(400).json({ message: 'Available slots can only be checked for future dates' });
  }

  const department = await Department.findById(departmentId);

  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }

  const appointments = await Appointment.find({
    department: departmentId,
    appointmentDate: normalizedDate,
    status: { $ne: 'Cancelled' }
  });

  const slotCounts = appointments.reduce((accumulator, appointment) => {
    accumulator[appointment.timeSlot] = (accumulator[appointment.timeSlot] || 0) + 1;
    return accumulator;
  }, {});

  const availableSlots = DEFAULT_TIME_SLOTS.filter((slot) => (slotCounts[slot] || 0) < MAX_APPOINTMENTS_PER_SLOT);

  res.status(200).json({
    department: {
      id: department._id,
      name: department.name
    },
    date: normalizedDate,
    availableSlots,
    slotSummary: DEFAULT_TIME_SLOTS.map((slot) => ({
      timeSlot: slot,
      bookedCount: slotCounts[slot] || 0,
        remaining: Math.max(MAX_APPOINTMENTS_PER_SLOT - (slotCounts[slot] || 0), 0)
    }))
  });
});

const getUserAppointments = asyncHandler(async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const appointments = await Appointment.find({ user: req.user.id })
    .populate('department')
    .sort({ appointmentDate: 1, timeSlot: 1 });

  res.status(200).json({ appointments });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Completed', 'Absent'].includes(status)) {
    return res.status(400).json({ message: 'Status must be Completed or Absent' });
  }

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).populate('user department');

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  res.status(200).json({
    message: 'Appointment status updated successfully',
    appointment
  });
});

module.exports = {
  createAppointment,
  getAvailableSlots,
  getUserAppointments,
  getAllAppointments,
  updateStatus
};