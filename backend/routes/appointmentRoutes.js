const express = require('express');
const { body, param, query } = require('express-validator');
const { createAppointment, getAvailableSlots, getUserAppointments, getAllAppointments, updateStatus } = require('../controllers/appointmentController');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', protect, adminOnly, getAllAppointments);

router.post(
  '/',
  protect,
  [
    body('departmentId').isMongoId().withMessage('A valid departmentId is required'),
    body('serviceType').trim().notEmpty().withMessage('Service type is required'),
    body('appointmentDate').isISO8601().withMessage('A valid appointment date is required'),
    body('timeSlot').trim().notEmpty().withMessage('Time slot is required')
  ],
  validateRequest,
  createAppointment
);

router.get(
  '/slots',
  protect,
  [
    query('departmentId').isMongoId().withMessage('A valid departmentId is required'),
    query('date').isISO8601().withMessage('A valid date is required')
  ],
  validateRequest,
  getAvailableSlots
);

router.get('/mine', protect, getUserAppointments);

router.patch(
  '/:id/status',
  protect,
  adminOnly,
  [param('id').isMongoId().withMessage('A valid appointment id is required')],
  validateRequest,
  updateStatus
);

module.exports = router;