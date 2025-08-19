const typeDefs = `#graphql
  enum Role {
    user
    admin
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: Role!
    posts: [Post!]!
    created_at: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    author_id: ID!
    created_at: String!
    updated_at: String!
  }


  type Query {
    # Public queries
    posts: [Post!]!
    post(id: ID!): Post
    
    # Protected queries (require authentication)
    me: User
    myPosts: [Post!]!
    
    # Admin-only queries (require admin role)
    users: [User!]!
  }

  type Mutation {
    # Protected mutations (require authentication)
    createPost(title: String!, content: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Boolean!
    
    # Vulnerable mutation - allows users to escalate their own privileges
    updateMyRole(newRole: Role!): User!
  }
`;

module.exports = typeDefs;

