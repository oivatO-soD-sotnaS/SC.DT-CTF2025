const { GraphQLError } = require('graphql');
const { dbHelpers } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const resolvers = {
  Query: {
    // Public queries
    posts: async () => {
      try {
        return await dbHelpers.getAllPosts();
      } catch (error) {
        throw new GraphQLError('Failed to fetch posts', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },

    post: async (_, { id }) => {
      try {
        const posts = await dbHelpers.getAllPosts();
        return posts.find(post => post.id.toString() === id);
      } catch (error) {
        throw new GraphQLError('Failed to fetch post', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },

    // Protected queries
    me: async (_, __, { user }) => {
      authMiddleware.requireAuth(user);
      return user;
    },

    myPosts: async (_, __, { user }) => {
      authMiddleware.requireAuth(user);
      try {
        return await dbHelpers.getPostsByAuthor(user.id);
      } catch (error) {
        throw new GraphQLError('Failed to fetch your posts', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },

    // Admin-only queries
    users: async (_, __, { user }) => {
      authMiddleware.requireAdmin(user);
      try {
        return await dbHelpers.getAllUsers();
      } catch (error) {
        throw new GraphQLError('Failed to fetch users', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },

  },

  Mutation: {
    // Protected mutations
    createPost: async (_, { title, content }, { user }) => {
      authMiddleware.requireAuth(user);
      try {
        const post = await dbHelpers.createPost(title, content, user.id);
        return {
          ...post,
          author_id: user.id
        };
      } catch (error) {
        throw new GraphQLError('Failed to create post', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    },

    updatePost: async (_, { id, title, content }, { user }) => {
      authMiddleware.requireAuth(user);
      // Note: For simplicity, we're not implementing update functionality in the database helpers
      // In a real application, you would add updatePost method to dbHelpers
      throw new GraphQLError('Update post functionality not implemented yet', {
        extensions: { code: 'NOT_IMPLEMENTED' }
      });
    },

    deletePost: async (_, { id }, { user }) => {
      authMiddleware.requireAuth(user);
      // Note: For simplicity, we're not implementing delete functionality in the database helpers
      // In a real application, you would add deletePost method to dbHelpers
      throw new GraphQLError('Delete post functionality not implemented yet', {
        extensions: { code: 'NOT_IMPLEMENTED' }
      });
    },

    // VULNERABLE MUTATION - Allows privilege escalation (intentional for CTF)
    updateMyRole: async (_, { newRole }, { user }) => {
      authMiddleware.requireAuth(user);
      
      try {
        // This is intentionally vulnerable - users can escalate their own privileges
        await dbHelpers.updateUserRole(user.id, newRole);
        
        // Return updated user data
        const updatedUser = await dbHelpers.findUserById(user.id);
        return updatedUser;
      } catch (error) {
        throw new GraphQLError('Failed to update role', {
          extensions: { code: 'INTERNAL_ERROR' }
        });
      }
    }
  },

  // Field resolvers
  User: {
    posts: async (parent) => {
      try {
        return await dbHelpers.getPostsByAuthor(parent.id);
      } catch (error) {
        return [];
      }
    }
  },

  Post: {
    author: async (parent) => {
      try {
        return await dbHelpers.findUserById(parent.author_id);
      } catch (error) {
        return null;
      }
    }
  }
};

module.exports = resolvers;

