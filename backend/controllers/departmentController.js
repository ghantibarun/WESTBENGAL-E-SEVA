const Department = require('../models/Department');
const asyncHandler = require('../middleware/asyncHandler');

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().sort({ name: 1 });
  res.status(200).json({ departments });
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }

  res.status(200).json({ department });
});

const createDepartment = asyncHandler(async (req, res) => {
  const { name, description, location } = req.body;

  const departmentExists = await Department.findOne({ name });

  if (departmentExists) {
    return res.status(409).json({ message: 'Department already exists' });
  }

  const department = await Department.create({ name, description, location });

  res.status(201).json({
    message: 'Department created successfully',
    department
  });
});

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment
};