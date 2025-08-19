# Apollo GraphQL API - Usage Examples

## Public API Endpoint

**GraphQL Endpoint**: `https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql`
**GraphQL Playground**: `https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql`

## Example Usage with curl

### 1. Register a New User

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { register(username: \"johndoe\", email: \"john@example.com\", password: \"securepass123\") { token user { id username email created_at } } }"
  }'
```

**Expected Response:**
```json
{
  "data": {
    "register": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "2",
        "username": "johndoe",
        "email": "john@example.com",
        "created_at": "2025-08-13 19:10:00"
      }
    }
  }
}
```

### 2. Login with Existing User

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(email: \"john@example.com\", password: \"securepass123\") { token user { id username email } } }"
  }'
```

### 3. Get All Posts (Public Query)

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { posts { id title content author { username email } created_at } }"
  }'
```

**Expected Response:**
```json
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "My First Post",
        "content": "This is the content of my first GraphQL post!",
        "author": {
          "username": "testuser",
          "email": "test@example.com"
        },
        "created_at": "2025-08-13 19:05:40"
      }
    ]
  }
}
```

### 4. Get Current User Info (Protected Query)

**Note**: Replace `YOUR_JWT_TOKEN` with the token received from login/register

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "query { me { id username email created_at } }"
  }'
```

### 5. Create a New Post (Protected Mutation)

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "mutation { createPost(title: \"GraphQL is Amazing\", content: \"Learning GraphQL with Apollo Server has been a great experience!\") { id title content author_id created_at } }"
  }'
```

### 6. Get My Posts (Protected Query)

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "query { myPosts { id title content created_at } }"
  }'
```

### 7. Test Authentication Error (No Token)

```bash
curl -X POST https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { me { id username email } }"
  }'
```

**Expected Error Response:**
```json
{
  "errors": [
    {
      "message": "You must be logged in to perform this action",
      "locations": [{"line": 1, "column": 9}],
      "path": ["me"],
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ],
  "data": {
    "me": null
  }
}
```

## JavaScript/Node.js Examples

### Using fetch API

```javascript
// Register a new user
async function registerUser() {
  const response = await fetch('https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation {
          register(username: "newuser", email: "newuser@example.com", password: "password123") {
            token
            user {
              id
              username
              email
            }
          }
        }
      `
    })
  });
  
  const data = await response.json();
  console.log(data);
  return data.data.register.token;
}

// Create a post with authentication
async function createPost(token) {
  const response = await fetch('https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        mutation {
          createPost(title: "My New Post", content: "This post was created via JavaScript!") {
            id
            title
            content
            author_id
          }
        }
      `
    })
  });
  
  const data = await response.json();
  console.log(data);
}

// Usage
registerUser().then(token => {
  createPost(token);
});
```

### Using Apollo Client

```javascript
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
  uri: 'https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql',
});

// Create auth link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Register mutation
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Get posts query
const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author {
        username
        email
      }
      created_at
    }
  }
`;

// Usage examples
async function registerAndGetPosts() {
  try {
    // Register user
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        username: 'apollouser',
        email: 'apollo@example.com',
        password: 'apollopass123'
      }
    });
    
    // Store token
    localStorage.setItem('token', data.register.token);
    
    // Get posts
    const postsResult = await client.query({
      query: GET_POSTS_QUERY
    });
    
    console.log('Posts:', postsResult.data.posts);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Python Examples

### Using requests library

```python
import requests
import json

# API endpoint
GRAPHQL_URL = 'https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql'

def register_user(username, email, password):
    query = """
    mutation {
        register(username: "%s", email: "%s", password: "%s") {
            token
            user {
                id
                username
                email
            }
        }
    }
    """ % (username, email, password)
    
    response = requests.post(
        GRAPHQL_URL,
        json={'query': query},
        headers={'Content-Type': 'application/json'}
    )
    
    return response.json()

def get_posts():
    query = """
    query {
        posts {
            id
            title
            content
            author {
                username
                email
            }
            created_at
        }
    }
    """
    
    response = requests.post(
        GRAPHQL_URL,
        json={'query': query},
        headers={'Content-Type': 'application/json'}
    )
    
    return response.json()

def create_post(token, title, content):
    query = """
    mutation {
        createPost(title: "%s", content: "%s") {
            id
            title
            content
            author_id
        }
    }
    """ % (title, content)
    
    response = requests.post(
        GRAPHQL_URL,
        json={'query': query},
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }
    )
    
    return response.json()

# Usage
if __name__ == "__main__":
    # Register a user
    result = register_user('pythonuser', 'python@example.com', 'pythonpass123')
    print('Registration:', result)
    
    if 'data' in result and result['data']['register']:
        token = result['data']['register']['token']
        
        # Create a post
        post_result = create_post(token, 'Python Post', 'This post was created using Python!')
        print('Post creation:', post_result)
    
    # Get all posts
    posts = get_posts()
    print('All posts:', posts)
```

## Testing the API

You can test the API using:

1. **GraphQL Playground**: Visit `https://4000-ihbuvsewwq89vw5dzkq46-278bf4c2.manus.computer/graphql` in your browser
2. **curl commands**: Use the examples above
3. **Postman**: Import the GraphQL endpoint and test queries/mutations
4. **Apollo Studio**: Connect to the public endpoint for advanced testing

## Authentication Flow

1. **Register** or **Login** to get a JWT token
2. **Store the token** securely (localStorage, secure cookie, etc.)
3. **Include the token** in the Authorization header for protected requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```
4. **Handle token expiration** by implementing refresh logic or re-authentication

## Error Handling

The API returns standard GraphQL errors with these codes:
- `UNAUTHENTICATED`: Missing or invalid authentication
- `BAD_USER_INPUT`: Invalid input data (e.g., duplicate email)
- `INTERNAL_ERROR`: Server-side errors
- `FORBIDDEN`: Insufficient permissions

