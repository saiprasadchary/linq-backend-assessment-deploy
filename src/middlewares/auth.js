// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

// Ideally, you store the secret key in an environment variable.
// For now, we hardcode it for simplicity.
const secretKey = 'your-secret-key';

function authenticateToken(req, res, next) {
  // Expect the token in the Authorization header as: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    // Attach the user data (if any) to the request and continue.
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, secretKey };