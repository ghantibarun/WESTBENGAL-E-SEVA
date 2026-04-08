const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = {
    id: decoded.id || decoded.userId || decoded._id,
    role: decoded.role || 'Citizen',
    ...decoded
  };

  if (!req.user.id) {
    return res.status(401).json({ message: 'Invalid token payload' });
  }

  next();
});

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};

module.exports = {
  protect,
  adminOnly
};