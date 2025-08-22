const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = 'Gibberish, jibberish, jibber-jabber and gobbledygook';
const JWT_EXPIRES_IN = '7d';

const jwtUtils = {
  // Generate JWT token
  generateToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  // Verify JWT token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  },

  // Extract token from Authorization header
  extractTokenFromHeader: (authHeader) => {
    if (!authHeader) {
      return null;
    }

    // Expected format: "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
};

module.exports = jwtUtils;

