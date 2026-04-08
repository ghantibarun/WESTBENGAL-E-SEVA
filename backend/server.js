require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const { seedAdmin } = require('./config/seedAdmin');
const seedDepartments = require('./config/seedDepartments');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bengal e-Seva API is running'
  });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  await seedDepartments();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();

module.exports = app;