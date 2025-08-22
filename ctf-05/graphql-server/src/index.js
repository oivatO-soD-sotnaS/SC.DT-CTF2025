const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
require('dotenv').config();

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { initializeDatabase } = require('./database/db');
const authMiddleware = require('./middleware/auth');

async function startServer() {
  // Initialize database
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Enable GraphQL Playground in development
    introspection: process.env.NODE_ENV !== 'production',
  });

  const PORT = 4001;

  // Start standalone server
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT, host: '0.0.0.0' },
    context: authMiddleware.createContext,
  });

  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 GraphQL endpoint: ${url}graphql`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🎮 GraphQL Playground: ${url}graphql`);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

