const express = require('express');
const { body, param } = require('express-validator');
const { createDepartment, getDepartmentById, getDepartments } = require('../controllers/departmentController');
const { adminOnly, protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', getDepartments);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('A valid department id is required')],
  validateRequest,
  getDepartmentById
);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('name').trim().notEmpty().withMessage('Department name is required'),
    body('description').trim().notEmpty().withMessage('Department description is required'),
    body('location').trim().notEmpty().withMessage('Department location is required')
  ],
  validateRequest,
  createDepartment
);

module.exports = router;