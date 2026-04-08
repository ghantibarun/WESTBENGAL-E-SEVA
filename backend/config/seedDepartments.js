const Department = require('../models/Department');

const defaultDepartments = [
  {
    name: 'Municipality',
    description: 'Citizen services for municipal certificates, tax, and local civic requests.',
    location: 'District Municipal Office'
  },
  {
    name: 'BLRO',
    description: 'Land records, mutation, and property-related services.',
    location: 'Block Land & Revenue Office'
  },
  {
    name: 'RTO',
    description: 'Driving licence, vehicle registration, and transport services.',
    location: 'Regional Transport Office'
  },
  {
    name: 'Revenue Office',
    description: 'Certificates, land revenue, and public record services.',
    location: 'Revenue Department Office'
  },
  {
    name: 'Health Department',
    description: 'Health-related certificates, medical support, and public welfare services.',
    location: 'District Health Office'
  },
  {
    name: 'Social Welfare',
    description: 'Pension, benefits, and welfare scheme assistance.',
    location: 'Social Welfare Office'
  }
];

async function seedDepartments() {
  const existingCount = await Department.countDocuments();

  if (existingCount > 0) {
    return false;
  }

  await Department.insertMany(defaultDepartments, { ordered: false });
  return true;
}

module.exports = seedDepartments;