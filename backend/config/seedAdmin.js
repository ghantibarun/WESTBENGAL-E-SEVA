const bcrypt = require('bcryptjs');
const User = require('../models/User');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

async function seedAdmin() {
  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (existingAdmin) {
    await User.updateOne(
      { email: ADMIN_EMAIL.toLowerCase() },
      {
        $set: {
          role: 'Admin',
          password: hashedPassword,
          updatedAt: new Date()
        }
      }
    );

    return false;
  }

  await User.collection.insertOne({
    name: 'Admin User',
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return true;
}

module.exports = {
  seedAdmin,
  ADMIN_EMAIL,
  ADMIN_PASSWORD
};