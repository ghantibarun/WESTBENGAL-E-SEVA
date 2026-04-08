require('dotenv').config();

const connectDB = require('../config/db');
const { seedAdmin, ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/seedAdmin');

async function run() {
  try {
    await connectDB();
    await seedAdmin();
    console.log(`Seeded admin user: ${ADMIN_EMAIL}`);
    process.exit(0);
  } catch (error) {
    console.error('Admin seed failed:', error.message);
    process.exit(1);
  }
}

run();