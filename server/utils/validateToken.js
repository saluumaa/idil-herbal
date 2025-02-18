const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  // Check for token in cookies or Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not Authenticated' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach user data to the request
    next();
  });
};

module.exports = validateToken;
