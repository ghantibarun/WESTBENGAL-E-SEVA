const express = require('express');
const userRoutes = require('./userRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const departmentRoutes = require('./departmentRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/departments', departmentRoutes);

module.exports = router;