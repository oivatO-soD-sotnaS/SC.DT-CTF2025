const { GraphQLError } = require('graphql');
const jwtUtils = require('../utils/jwt');
const { dbHelpers } = require('../database/db');

const authMiddleware = {
  // Context function for Apollo Server
  createContext: async ({ req }) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = jwtUtils.extractTokenFromHeader(authHeader);
    
    let user = null;
    
    if (token) {
      try {
        // Verify token and get user data
        const decoded = jwtUtils.verifyToken(token);
        user = await dbHelpers.findUserById(decoded.userId);
      } catch (error) {
        // Token is invalid, but we don't throw error here
        // Let individual resolvers handle authentication requirements
        console.log('Invalid token:', error.message);
      }
    }
    
    return {
      user,
      isAuthenticated: !!user
    };
  },

  // Helper function to require authentication in resolvers
  requireAuth: (user) => {
    if (!user) {
      throw new GraphQLError('You must be logged in to perform this action', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {
            status: 401
          }
        },
      });
    }
    return user;
  },

  // Helper function to require admin role
  requireAdmin: (user) => {
    authMiddleware.requireAuth(user);
    
    if (user.role !== 'admin') {
      throw new GraphQLError('Admin access required', {
        extensions: {
          code: 'UNAUTHORIZED',
        },
      });
    }
    
    return user;
  },

  // Helper function to check if user owns a resource
  requireOwnership: (user, resourceUserId) => {
    authMiddleware.requireAuth(user);
    
    if (user.id !== resourceUserId) {
      throw new GraphQLError('You can only access your own resources', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    
    return true;
  }
};

module.exports = authMiddleware;

