import type { ApiType, QuizQuestion, ComparisonData } from '../types';

export const apiTypes: ApiType[] = [
  {
    id: 'rest',
    name: 'REST',
    fullName: 'Representational State Transfer',
    description: 'A stateless, resource-oriented architectural style that uses standard HTTP methods to perform CRUD operations on resources identified by URLs.',
    icon: 'Http',
    color: '#4CAF50',
    features: [
      'Stateless communication',
      'Resource-based URLs',
      'Standard HTTP methods (GET, POST, PUT, DELETE)',
      'JSON/XML data formats',
      'Cacheable responses',
      'Layered system architecture'
    ],
    useCases: [
      'Web APIs and microservices',
      'Mobile backend services',
      'CRUD operations',
      'Public APIs',
      'Caching-heavy applications'
    ],
    pros: [
      'Simple and widely understood',
      'Excellent tooling support',
      'Easy to cache',
      'Language agnostic',
      'Scalable and stateless'
    ],
    cons: [
      'Over-fetching of data',
      'Multiple round trips',
      'No built-in versioning',
      'Can become complex with relations'
    ],
    whenToUse: [
      'Building public APIs',
      'Simple CRUD operations',
      'When caching is important',
      'Wide client support needed'
    ],
    httpMethod: 'GET, POST, PUT, DELETE, PATCH',
    dataFormat: 'JSON, XML, HTML',
    transport: 'HTTP/HTTPS',
    codeExamples: [
      {
        title: 'Server (Node.js + Express)',
        language: 'javascript',
        code: `const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json({ 
    success: true, 
    data: users,
    count: users.length 
  });
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.json({ success: true, data: user });
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  users[index] = { ...users[index], ...req.body };
  res.json({ success: true, data: users[index] });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('🚀 REST API server running on http://localhost:3000');
});`,
        explanation: 'A complete REST API server with CRUD operations using Express.js. Includes proper HTTP status codes and JSON responses.'
      },
      {
        title: 'Client (Fetch API)',
        language: 'javascript',
        code: `// GET all users
async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const result = await response.json();
    console.log('Users:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// GET single user
async function getUser(id) {
  const response = await fetch(\`http://localhost:3000/api/users/\${id}\`);
  const result = await response.json();
  return result.data;
}

// POST create user
async function createUser(userData) {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  const result = await response.json();
  console.log('Created user:', result.data);
  return result.data;
}

// PUT update user
async function updateUser(id, updates) {
  const response = await fetch(\`http://localhost:3000/api/users/\${id}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });
  const result = await response.json();
  return result.data;
}

// DELETE user
async function deleteUser(id) {
  const response = await fetch(\`http://localhost:3000/api/users/\${id}\`, {
    method: 'DELETE'
  });
  return response.status === 204;
}

// Usage examples
getUsers();
createUser({ name: 'Charlie', email: 'charlie@example.com' });`,
        explanation: 'JavaScript client using the modern Fetch API to interact with REST endpoints. Includes error handling and all CRUD operations.'
      },
      {
        title: 'Client (Python requests)',
        language: 'python',
        code: `import requests

BASE_URL = 'http://localhost:3000/api'

# GET all users
response = requests.get(f'{BASE_URL}/users')
users = response.json()
print(f"Found {users['count']} users")

# GET single user
user_id = 1
response = requests.get(f'{BASE_URL}/users/{user_id}')
user = response.json()
print(f"User: {user['data']['name']}")

# POST create user
new_user = {
    'name': 'Diana',
    'email': 'diana@example.com'
}
response = requests.post(f'{BASE_URL}/users', json=new_user)
created = response.json()
print(f"Created user with ID: {created['data']['id']}")

# PUT update user
updates = {'name': 'Diana Prince'}
response = requests.put(f'{BASE_URL}/users/{created[\"data\"][\"id\"]}', json=updates)

# DELETE user
requests.delete(f'{BASE_URL}/users/{created["data"]["id"]}')`,
        explanation: 'Python client using the popular requests library. Clean syntax for making HTTP requests with automatic JSON handling.'
      }
    ],
    architecture: [
      { step: 1, title: 'Client Request', description: 'Client sends HTTP request with method, headers, and optional body' },
      { step: 2, title: 'Server Routing', description: 'Server routes request to appropriate handler based on URL and method' },
      { step: 3, title: 'Business Logic', description: 'Server processes request, validates data, performs operations' },
      { step: 4, title: 'Data Access', description: 'Database queries or external API calls if needed' },
      { step: 5, title: 'Response', description: 'Server sends HTTP response with status code and data' }
    ]
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    fullName: 'Graph Query Language',
    description: 'A query language and runtime for APIs that allows clients to request exactly the data they need, reducing over-fetching and under-fetching.',
    icon: 'AccountTree',
    color: '#E535AB',
    features: [
      'Precise data fetching',
      'Single endpoint',
      'Strongly typed schema',
      'Introspection',
      'Real-time subscriptions',
      'Query/Mutation/Subscription operations'
    ],
    useCases: [
      'Complex data relationships',
      'Mobile applications',
      'Microservices aggregation',
      'Rapidly evolving APIs',
      'Analytics dashboards'
    ],
    pros: [
      'No over-fetching',
      'Single request for complex data',
      'Self-documenting',
      'Strong typing',
      'Developer tools (Playground)'
    ],
    cons: [
      'Steeper learning curve',
      'Caching complexity',
      'Query complexity limits needed',
      'File upload complexity',
      'N+1 query problem'
    ],
    whenToUse: [
      'Complex data hierarchies',
      'Bandwidth-constrained clients',
      'Rapidly evolving requirements',
      'Aggregating multiple services'
    ],
    httpMethod: 'POST (usually)',
    dataFormat: 'JSON',
    transport: 'HTTP/HTTPS, WebSocket (subscriptions)',
    codeExamples: [
      {
        title: 'Schema Definition',
        language: 'graphql',
        code: `# GraphQL Schema

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: String!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  published: Boolean!
}

type Query {
  # Fetch single user
  user(id: ID!): User
  
  # Fetch all users with pagination
  users(limit: Int, offset: Int): [User!]!
  
  # Search posts
  posts(publishedOnly: Boolean = true): [Post!]!
}

type Mutation {
  # Create new user
  createUser(name: String!, email: String!): User!
  
  # Update user
  updateUser(id: ID!, name: String, email: String): User!
  
  # Delete user
  deleteUser(id: ID!): Boolean!
  
  # Create post
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

type Subscription {
  # Real-time user updates
  userUpdated: User!
  
  # New posts
  postCreated: Post!
}`,
        explanation: 'GraphQL schema defines the type system. Exclamation marks (!) denote required fields. Types, queries, mutations, and subscriptions are all declared.'
      },
      {
        title: 'Server (Node.js + Apollo)',
        language: 'javascript',
        code: `const { ApolloServer, gql } = require('apollo-server');

// Sample data
const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com', posts: ['1', '2'] },
  { id: '2', name: 'Bob', email: 'bob@example.com', posts: ['3'] }
];

const posts = [
  { id: '1', title: 'GraphQL Basics', content: '...', authorId: '1', published: true },
  { id: '2', title: 'Advanced Patterns', content: '...', authorId: '1', published: false },
  { id: '3', title: 'REST vs GraphQL', content: '...', authorId: '2', published: true }
];

// Resolvers
const resolvers = {
  Query: {
    user: (_, { id }) => users.find(u => u.id === id),
    users: (_, { limit = 10, offset = 0 }) => 
      users.slice(offset, offset + limit),
    posts: (_, { publishedOnly = true }) => 
      posts.filter(p => !publishedOnly || p.published)
  },
  
  Mutation: {
    createUser: (_, { name, email }) => {
      const newUser = {
        id: String(Date.now()),
        name,
        email,
        posts: []
      };
      users.push(newUser);
      return newUser;
    },
    
    updateUser: (_, { id, ...updates }) => {
      const user = users.find(u => u.id === id);
      if (!user) throw new Error('User not found');
      Object.assign(user, updates);
      return user;
    },
    
    deleteUser: (_, { id }) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return false;
      users.splice(index, 1);
      return true;
    }
  },
  
  // Field-level resolver for User.posts
  User: {
    posts: (parent) => posts.filter(p => parent.posts.includes(p.id))
  },
  
  // Field-level resolver for Post.author
  Post: {
    author: (parent) => users.find(u => u.id === parent.authorId)
  }
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

server.listen().then(({ url }) => {
  console.log(\`🚀 GraphQL server ready at \${url}\`);
});`,
        explanation: 'Apollo Server implementation with resolvers. Shows how to resolve nested relationships and implement CRUD operations.'
      },
      {
        title: 'Client Query Examples',
        language: 'graphql',
        code: `# Query - Fetch specific fields
query GetUserWithPosts {
  user(id: "1") {
    name
    email
    posts {
      title
      published
    }
  }
}

# Query with variables
query GetUsers($limit: Int, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    id
    name
    email
  }
}
# Variables: { "limit": 5, "offset": 0 }

# Mutation
mutation CreateNewUser {
  createUser(name: "Charlie", email: "charlie@example.com") {
    id
    name
    email
  }
}

# Fragment - reusable selection sets
fragment UserInfo on User {
  id
  name
  email
}

query GetAllUsers {
  users {
    ...UserInfo
    posts {
      title
    }
  }
}`,
        explanation: 'GraphQL queries allow requesting exactly the fields you need. Supports variables, fragments for reusability, and aliases.'
      },
      {
        title: 'Client (Apollo React)',
        language: 'javascript',
        code: `import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';

// Initialize client
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

// Define queries
const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`;

const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`;

// React Component
function UsersList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      <button onClick={() => createUser({ 
        variables: { name: 'New User', email: 'new@example.com' } 
      })}>
        Add User
      </button>
    </div>
  );
}`,
        explanation: 'React integration with Apollo Client. Shows declarative data fetching with automatic caching and cache updates after mutations.'
      }
    ],
    architecture: [
      { step: 1, title: 'Client Query', description: 'Client sends GraphQL query specifying exact fields needed' },
      { step: 2, title: 'Parse & Validate', description: 'Server parses query and validates against schema' },
      { step: 3, title: 'Execute Resolvers', description: 'Resolver functions fetch data for each field' },
      { step: 4, title: 'Resolve Relations', description: 'Nested resolvers handle relationships between types' },
      { step: 5, title: 'Shape Response', description: 'Response formatted to match query structure exactly' }
    ]
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    fullName: 'WebSocket Protocol',
    description: 'A full-duplex communication protocol that provides a persistent, low-latency connection for real-time bidirectional data transfer.',
    icon: 'SwapHoriz',
    color: '#FF9800',
    features: [
      'Full-duplex communication',
      'Persistent connection',
      'Low latency',
      'Real-time data push',
      'Binary and text support',
      'WS and WSS protocols'
    ],
    useCases: [
      'Real-time chat applications',
      'Live notifications',
      'Gaming',
      'Stock tickers',
      'Collaborative editing',
      'IoT device communication'
    ],
    pros: [
      'True real-time communication',
      'Lower overhead than HTTP polling',
      'Bidirectional messaging',
      'Efficient for high-frequency updates'
    ],
    cons: [
      'Connection state management',
      'Firewall/proxy issues',
      'No built-in reconnection',
      'Horizontal scaling complexity',
      'Memory usage for connections'
    ],
    whenToUse: [
      'Real-time updates needed',
      'Bidirectional communication',
      'Low latency is critical',
      'Frequent small messages'
    ],
    httpMethod: 'WS (WebSocket)',
    dataFormat: 'Text, Binary, JSON',
    transport: 'TCP (upgraded from HTTP)',
    codeExamples: [
      {
        title: 'Server (Node.js + ws)',
        language: 'javascript',
        code: `const WebSocket = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server\\n');
});

// WebSocket server
const wss = new WebSocket.Server({ server });

// Connected clients
const clients = new Map();

wss.on('connection', (ws, req) => {
  const clientId = Date.now();
  clients.set(clientId, { ws, username: null });
  
  console.log(\`Client \${clientId} connected. Total: \${clients.size}\`);
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'system',
    message: 'Welcome! Please set your username.'
  }));
  
  // Handle messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      switch(message.type) {
        case 'username':
          clients.get(clientId).username = message.username;
          broadcast({
            type: 'system',
            message: \`\${message.username} joined the chat\`
          });
          break;
          
        case 'chat':
          const { username } = clients.get(clientId);
          broadcast({
            type: 'chat',
            username,
            message: message.text,
            timestamp: new Date().toISOString()
          }, clientId);
          break;
          
        case 'typing':
          broadcast({
            type: 'typing',
            username: clients.get(clientId).username
          }, clientId);
          break;
      }
    } catch (err) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });
  
  // Handle disconnect
  ws.on('close', () => {
    const { username } = clients.get(clientId) || {};
    clients.delete(clientId);
    if (username) {
      broadcast({
        type: 'system',
        message: \`\${username} left the chat\`
      });
    }
    console.log(\`Client \${clientId} disconnected. Total: \${clients.size}\`);
  });
});

// Broadcast to all clients
function broadcast(message, excludeId = null) {
  const data = JSON.stringify(message);
  clients.forEach((client, id) => {
    if (id !== excludeId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  });
}

server.listen(8080, () => {
  console.log('🚀 WebSocket server on http://localhost:8080');
});`,
        explanation: 'Complete WebSocket chat server with user management, message types, and broadcast functionality.'
      },
      {
        title: 'Client (Browser)',
        language: 'javascript',
        code: `class ChatClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Map();
  }
  
  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('✅ Connected to server');
      this.reconnectAttempts = 0;
      this.emit('connected');
    };
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.emit('message', message);
      
      // Handle specific message types
      switch(message.type) {
        case 'chat':
          this.displayMessage(message);
          break;
        case 'typing':
          this.showTypingIndicator(message.username);
          break;
        case 'system':
          this.displaySystemMessage(message.message);
          break;
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      this.emit('error', error);
    };
    
    this.ws.onclose = () => {
      console.log('🔌 Connection closed');
      this.emit('disconnected');
      this.attemptReconnect();
    };
  }
  
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      console.log(\`Reconnecting in \${delay}ms... (attempt \${this.reconnectAttempts})\`);
      setTimeout(() => this.connect(), delay);
    }
  }
  
  send(type, data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...data }));
    }
  }
  
  setUsername(username) {
    this.send('username', { username });
  }
  
  sendMessage(text) {
    this.send('chat', { text });
  }
  
  notifyTyping() {
    this.send('typing', {});
  }
  
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
  
  emit(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(cb => cb(data));
  }
  
  disconnect() {
    this.ws?.close();
  }
}

// Usage
const chat = new ChatClient('ws://localhost:8080');

chat.on('connected', () => {
  chat.setUsername('Alice');
});

chat.on('message', (msg) => {
  console.log('New message:', msg);
});

chat.connect();

// Send a message
chat.sendMessage('Hello everyone!');`,
        explanation: 'Robust WebSocket client class with automatic reconnection, event handling, and typed messages.'
      }
    ],
    architecture: [
      { step: 1, title: 'HTTP Handshake', description: 'Client sends WebSocket upgrade request via HTTP' },
      { step: 2, title: 'Connection Established', description: 'Server accepts upgrade, persistent TCP connection opened' },
      { step: 3, title: 'Bidirectional Data', description: 'Both parties can send messages at any time' },
      { step: 4, title: 'Message Framing', description: 'Data wrapped in WebSocket frames for transmission' },
      { step: 5, title: 'Connection Close', description: 'Either party can close connection with close frame' }
    ]
  },
  {
    id: 'grpc',
    name: 'gRPC',
    fullName: 'Google Remote Procedure Call',
    description: 'A high-performance, open-source universal RPC framework that uses Protocol Buffers for serialization and HTTP/2 for transport.',
    icon: 'SettingsEthernet',
    color: '#2196F3',
    features: [
      'Protocol Buffers serialization',
      'HTTP/2 transport',
      'Strongly typed service definitions',
      'Bi-directional streaming',
      'Load balancing',
      'Authentication support',
      'Code generation'
    ],
    useCases: [
      'Microservices communication',
      'Low-latency services',
      'Polyglot environments',
      'Mobile clients',
      'Streaming data processing',
      'IoT device management'
    ],
    pros: [
      'High performance',
      'Small payload size (binary)',
      'Streaming support',
      'Strong API contracts',
      'Auto-generated client/server code',
      'Bidirectional streaming'
    ],
    cons: [
      'Limited browser support (requires gRPC-Web)',
      'Binary format not human-readable',
      'Requires .proto files',
      'Steeper learning curve',
      'Proxy/load balancer complexity'
    ],
    whenToUse: [
      'Internal microservices',
      'High-performance requirements',
      'Multiple languages in stack',
      'Streaming data needs',
      'Strict API contracts needed'
    ],
    httpMethod: 'RPC Methods',
    dataFormat: 'Protocol Buffers (binary)',
    transport: 'HTTP/2',
    codeExamples: [
      {
        title: 'Protocol Buffer Definition',
        language: 'protobuf',
        code: `// user_service.proto
syntax = "proto3";

package userservice;

option go_package = "example.com/userservice";

// User message definition
message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int32 age = 4;
  repeated string roles = 5;
  Address address = 6;
  google.protobuf.Timestamp created_at = 7;
}

message Address {
  string street = 1;
  string city = 2;
  string country = 3;
}

// Request/Response messages
message GetUserRequest {
  string id = 1;
}

message GetUserResponse {
  User user = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
  int32 age = 3;
}

message CreateUserResponse {
  User user = 1;
}

// Stream example
message ChatMessage {
  string user = 1;
  string message = 2;
  int64 timestamp = 3;
}

// Service definition
service UserService {
  // Unary RPC - single request, single response
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  
  // Server streaming - single request, stream of responses
  rpc ListUsers(ListUsersRequest) returns (stream User);
  
  // Client streaming - stream of requests, single response
  rpc CreateUsers(stream CreateUserRequest) returns (ListUsersResponse);
  
  // Bidirectional streaming
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}`,
        explanation: 'Protocol Buffers schema defining messages and service methods. Supports unary, server streaming, client streaming, and bidirectional streaming RPCs.'
      },
      {
        title: 'Server (Node.js)',
        language: 'javascript',
        code: `const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto file
const packageDefinition = protoLoader.loadSync('./user_service.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDefinition).userservice;

// In-memory data store
const users = new Map();

// Unary RPC - GetUser
function getUser(call, callback) {
  const userId = call.request.id;
  const user = users.get(userId);
  
  if (!user) {
    return callback({
      code: grpc.status.NOT_FOUND,
      message: 'User not found'
    });
  }
  
  callback(null, { user });
}

// Server Streaming - ListUsers
function listUsers(call) {
  const pageSize = call.request.page_size || 10;
  let count = 0;
  
  for (const user of users.values()) {
    if (count >= pageSize) break;
    call.write(user);
    count++;
  }
  
  call.end();
}

// Client Streaming - CreateUsers
function createUsers(call, callback) {
  const createdUsers = [];
  
  call.on('data', (request) => {
    const user = {
      id: String(Date.now() + Math.random()),
      name: request.name,
      email: request.email,
      age: request.age
    };
    users.set(user.id, user);
    createdUsers.push(user);
  });
  
  call.on('end', () => {
    callback(null, { users: createdUsers });
  });
}

// Bidirectional Streaming - Chat
function chat(call) {
  call.on('data', (message) => {
    console.log(\`[\${message.user}]: \${message.message}\`);
    
    // Echo back with server timestamp
    call.write({
      user: 'Server',
      message: \`Echo: \${message.message}\`,
      timestamp: Date.now()
    });
  });
  
  call.on('end', () => {
    call.end();
  });
}

// Create and start server
const server = new grpc.Server();

server.addService(proto.UserService.service, {
  getUser,
  listUsers,
  createUsers,
  chat
});

const PORT = '0.0.0.0:50051';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) {
    console.error('Failed to bind:', err);
    return;
  }
  console.log(\`🚀 gRPC server running on \${PORT}\`);
  server.start();
});`,
        explanation: 'gRPC server implementing all four types of RPC methods: unary, server streaming, client streaming, and bidirectional streaming.'
      },
      {
        title: 'Client (Node.js)',
        language: 'javascript',
        code: `const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto
const packageDef = protoLoader.loadSync('./user_service.proto', {});
const proto = grpc.loadPackageDefinition(packageDef).userservice;

// Create client
const client = new proto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// 1. Unary RPC
function getUser(id) {
  return new Promise((resolve, reject) => {
    client.getUser({ id }, (err, response) => {
      if (err) reject(err);
      else resolve(response.user);
    });
  });
}

// 2. Server Streaming
async function listAllUsers() {
  const stream = client.listUsers({ page_size: 10 });
  
  stream.on('data', (user) => {
    console.log('Received user:', user);
  });
  
  stream.on('end', () => {
    console.log('Stream ended');
  });
  
  stream.on('error', (err) => {
    console.error('Stream error:', err);
  });
}

// 3. Client Streaming
function createMultipleUsers(userDataArray) {
  return new Promise((resolve, reject) => {
    const stream = client.createUsers((err, response) => {
      if (err) reject(err);
      else resolve(response.users);
    });
    
    userDataArray.forEach(data => stream.write(data));
    stream.end();
  });
}

// 4. Bidirectional Streaming
function startChat() {
  const stream = client.chat();
  
  stream.on('data', (message) => {
    console.log(\`[\${message.user}]: \${message.message}\`);
  });
  
  // Send messages
  const messages = [
    { user: 'Alice', message: 'Hello!', timestamp: Date.now() },
    { user: 'Alice', message: 'How is everyone?', timestamp: Date.now() }
  ];
  
  messages.forEach((msg, i) => {
    setTimeout(() => stream.write(msg), i * 1000);
  });
  
  setTimeout(() => stream.end(), 5000);
}

// Usage
async function main() {
  try {
    // Create users
    const users = await createMultipleUsers([
      { name: 'Alice', email: 'alice@example.com', age: 30 },
      { name: 'Bob', email: 'bob@example.com', age: 25 }
    ]);
    console.log('Created users:', users);
    
    // Get specific user
    const user = await getUser(users[0].id);
    console.log('Got user:', user);
    
    // List all users
    await listAllUsers();
    
  } catch (err) {
    console.error('Error:', err);
  }
}

main();`,
        explanation: 'gRPC client demonstrating all four RPC patterns with proper error handling and streaming event management.'
      }
    ],
    architecture: [
      { step: 1, title: 'Service Definition', description: 'Define service and messages in .proto file' },
      { step: 2, title: 'Code Generation', description: 'Generate client/server code using protoc compiler' },
      { step: 3, title: 'HTTP/2 Connection', description: 'Establish persistent HTTP/2 connection with multiplexing' },
      { step: 4, title: 'Binary Serialization', description: 'Serialize messages to compact binary format using Protobuf' },
      { step: 5, title: 'RPC Execution', description: 'Execute remote procedure and return serialized response' }
    ]
  },
  {
    id: 'soap',
    name: 'SOAP',
    fullName: 'Simple Object Access Protocol',
    description: 'A protocol specification for exchanging structured information via XML messages, commonly used in enterprise systems.',
    icon: 'Description',
    color: '#795548',
    features: [
      'XML message format',
      'WSDL service descriptions',
      'WS-* standards support',
      'Built-in error handling',
      'Transport independent',
      'ACID compliance support'
    ],
    useCases: [
      'Enterprise systems integration',
      'Financial services',
      'Legacy system integration',
      'Government systems',
      'Healthcare (HL7)',
      'Payment processing'
    ],
    pros: [
      'Strict contracts (WSDL)',
      'Built-in security standards',
      'Reliable messaging',
      'Transaction support',
      'Language/platform independent',
      'Mature tooling'
    ],
    cons: [
      'Verbose XML format',
      'Higher bandwidth usage',
      'Complex specification',
      'Slower parsing',
      'Steeper learning curve',
      'Less human-readable'
    ],
    whenToUse: [
      'Enterprise integration',
      'Legacy system connectivity',
      'Strict security requirements',
      'Transaction reliability needed',
      'Formal contracts required'
    ],
    httpMethod: 'POST',
    dataFormat: 'XML',
    transport: 'HTTP, SMTP, JMS, etc.',
    codeExamples: [
      {
        title: 'WSDL Definition',
        language: 'xml',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://example.com/userservice"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             targetNamespace="http://example.com/userservice">

  <!-- Data Types -->
  <types>
    <xsd:schema targetNamespace="http://example.com/userservice">
      
      <xsd:complexType name="User">
        <xsd:sequence>
          <xsd:element name="id" type="xsd:long"/>
          <xsd:element name="name" type="xsd:string"/>
          <xsd:element name="email" type="xsd:string"/>
          <xsd:element name="age" type="xsd:int" minOccurs="0"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:element name="GetUserRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="id" type="xsd:long"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      
      <xsd:element name="GetUserResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="user" type="tns:User"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      
    </xsd:schema>
  </types>

  <!-- Messages -->
  <message name="GetUserRequestMessage">
    <part name="parameters" element="tns:GetUserRequest"/>
  </message>
  
  <message name="GetUserResponseMessage">
    <part name="parameters" element="tns:GetUserResponse"/>
  </message>

  <!-- Port Type (Interface) -->
  <portType name="UserServicePortType">
    <operation name="GetUser">
      <input message="tns:GetUserRequestMessage"/>
      <output message="tns:GetUserResponseMessage"/>
    </operation>
  </portType>

  <!-- Binding -->
  <binding name="UserServiceBinding" type="tns:UserServicePortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="GetUser">
      <soap:operation soapAction="http://example.com/GetUser"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>

  <!-- Service -->
  <service name="UserService">
    <port name="UserServicePort" binding="tns:UserServiceBinding">
      <soap:address location="http://localhost:8000/soap"/>
    </port>
  </service>

</definitions>`,
        explanation: 'WSDL (Web Services Description Language) defines the service contract, data types, operations, and endpoint binding.'
      },
      {
        title: 'SOAP Message Examples',
        language: 'xml',
        code: `<!-- SOAP Request -->
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:user="http://example.com/userservice">
    
  <soap:Header>
    <user:AuthToken>abc123xyz</user:AuthToken>
  </soap:Header>
  
  <soap:Body>
    <user:GetUserRequest>
      <user:id>123</user:id>
    </user:GetUserRequest>
  </soap:Body>
  
</soap:Envelope>

<!-- SOAP Response -->
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    
  <soap:Body>
    <GetUserResponse xmlns="http://example.com/userservice">
      <user>
        <id>123</id>
        <name>John Doe</name>
        <email>john@example.com</email>
        <age>30</age>
      </user>
    </GetUserResponse>
  </soap:Body>
  
</soap:Envelope>

<!-- SOAP Fault (Error) -->
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>User not found</faultstring>
      <detail>
        <errorCode>USER_001</errorCode>
      </detail>
    </soap:Fault>
  </soap:Body>
  
</soap:Envelope>`,
        explanation: 'SOAP messages use XML with Envelope, Header (optional), and Body elements. Fault elements indicate errors.'
      },
      {
        title: 'Server (Node.js + soap)',
        language: 'javascript',
        code: `const soap = require('soap');
const http = require('http');
const fs = require('fs');

// Sample data
const users = new Map([
  ['1', { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28 }],
  ['2', { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 35 }]
]);

// Service implementation
const userService = {
  UserService: {
    UserServicePort: {
      // GetUser operation
      GetUser: function(args) {
        const userId = String(args.id);
        const user = users.get(userId);
        
        if (!user) {
          throw {
            Fault: {
              faultcode: 'Client',
              faultstring: 'User not found',
              detail: { errorCode: 'USER_NOT_FOUND' }
            }
          };
        }
        
        return { user };
      },
      
      // CreateUser operation
      CreateUser: function(args) {
        const id = String(Date.now());
        const newUser = {
          id: id,
          name: args.name,
          email: args.email,
          age: args.age || 0
        };
        users.set(id, newUser);
        return { user: newUser };
      },
      
      // ListUsers operation
      ListUsers: function() {
        return { 
          users: Array.from(users.values()) 
        };
      },
      
      // UpdateUser operation
      UpdateUser: function(args) {
        const userId = String(args.id);
        const existing = users.get(userId);
        
        if (!existing) {
          throw {
            Fault: {
              faultcode: 'Client',
              faultstring: 'User not found'
            }
          };
        }
        
        const updated = {
          ...existing,
          name: args.name || existing.name,
          email: args.email || existing.email,
          age: args.age !== undefined ? args.age : existing.age
        };
        
        users.set(userId, updated);
        return { user: updated };
      },
      
      // DeleteUser operation
      DeleteUser: function(args) {
        const userId = String(args.id);
        const deleted = users.delete(userId);
        return { success: deleted };
      }
    }
  }
};

// Load WSDL file
const wsdl = fs.readFileSync('user_service.wsdl', 'utf8');

// Create server
const server = http.createServer(function(request, response) {
  response.end('SOAP Server Running');
});

server.listen(8000, function() {
  // Publish SOAP service
  soap.listen(server, '/soap', userService, wsdl);
  console.log('🚀 SOAP server running at http://localhost:8000/soap?wsdl');
});`,
        explanation: 'SOAP server using Node.js soap library. Implements CRUD operations with proper SOAP fault handling.'
      },
      {
        title: 'Client (Node.js)',
        language: 'javascript',
        code: `const soap = require('soap');

const WSDL_URL = 'http://localhost:8000/soap?wsdl';

async function main() {
  try {
    // Create client from WSDL
    const client = await soap.createClientAsync(WSDL_URL);
    
    // Log available operations
    console.log('Available operations:', Object.keys(client));
    
    // 1. Create a user
    const [createResult] = await client.CreateUserAsync({
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      age: 25
    });
    console.log('Created:', createResult);
    
    const newUserId = createResult.user.id;
    
    // 2. Get the user
    const [getResult] = await client.GetUserAsync({ id: newUserId });
    console.log('Retrieved:', getResult);
    
    // 3. Update user
    const [updateResult] = await client.UpdateUserAsync({
      id: newUserId,
      name: 'Charlie B.',
      age: 26
    });
    console.log('Updated:', updateResult);
    
    // 4. List all users
    const [listResult] = await client.ListUsersAsync({});
    console.log('All users:', listResult.users);
    
    // 5. Delete user
    const [deleteResult] = await client.DeleteUserAsync({ id: newUserId });
    console.log('Deleted:', deleteResult);
    
    // 6. Try to get deleted user (will throw error)
    try {
      await client.GetUserAsync({ id: newUserId });
    } catch (err) {
      console.log('Expected error:', err.message);
    }
    
  } catch (err) {
    console.error('SOAP Error:', err);
  }
}

// Raw SOAP request example
function rawSoapRequest() {
  const requestXml = \`<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUserRequest xmlns="http://example.com/userservice">
      <id>1</id>
    </GetUserRequest>
  </soap:Body>
</soap:Envelope>\`;

  // Could use axios/fetch to send this XML to the SOAP endpoint
  console.log('Raw SOAP Request:', requestXml);
}

main();`,
        explanation: 'SOAP client using WSDL to auto-generate methods. Shows both high-level client usage and raw XML structure.'
      }
    ],
    architecture: [
      { step: 1, title: 'WSDL Contract', description: 'Service defined in WSDL with types, operations, and bindings' },
      { step: 2, title: 'SOAP Envelope', description: 'Request wrapped in SOAP Envelope with Header and Body' },
      { step: 3, title: 'Transport', description: 'Message sent via HTTP POST (or other transport)' },
      { step: 4, title: 'Processing', description: 'Server unmarshals XML, executes operation, marshals response' },
      { step: 5, title: 'Response', description: 'SOAP response returned with result or Fault element' }
    ]
  }
];

export const comparisonData: ComparisonData[] = [
  { feature: 'Data Format', rest: 'JSON, XML', graphql: 'JSON', websocket: 'Text, Binary, JSON', grpc: 'Protocol Buffers (binary)', soap: 'XML' },
  { feature: 'Transport', rest: 'HTTP/HTTPS', graphql: 'HTTP/HTTPS, WS', websocket: 'WS/WSS (TCP)', grpc: 'HTTP/2', soap: 'HTTP, SMTP, JMS' },
  { feature: 'Schema', rest: 'OpenAPI/Swagger', graphql: 'GraphQL Schema', websocket: 'Custom', grpc: 'Protobuf (.proto)', soap: 'WSDL + XSD' },
  { feature: 'Human Readable', rest: '✅ Yes', graphql: '✅ Yes', websocket: '✅ Yes', grpc: '❌ Binary', soap: '✅ Yes (verbose)' },
  { feature: 'Browser Support', rest: '✅ Native', graphql: '✅ Native', websocket: '✅ Native', grpc: '⚠️ gRPC-Web', soap: '✅ Native' },
  { feature: 'Streaming', rest: '❌ No', graphql: '✅ Subscriptions', websocket: '✅ Bidirectional', grpc: '✅ All types', soap: '⚠️ Limited' },
  { feature: 'Performance', rest: 'Good', graphql: 'Good', websocket: 'Excellent', grpc: 'Excellent', soap: 'Moderate' },
  { feature: 'Caching', rest: '✅ HTTP caching', graphql: '⚠️ Custom', websocket: '❌ No', grpc: '⚠️ Limited', soap: '⚠️ Limited' },
  { feature: 'Tooling', rest: 'Excellent', graphql: 'Excellent', websocket: 'Good', grpc: 'Good', soap: 'Mature' },
  { feature: 'Learning Curve', rest: 'Low', graphql: 'Medium', websocket: 'Low', grpc: 'Medium', soap: 'High' },
  { feature: 'Best For', rest: 'General APIs', graphql: 'Complex queries', websocket: 'Real-time', grpc: 'Microservices', soap: 'Enterprise' }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'rest-1',
    question: 'Which HTTP method is typically used to update an existing resource in REST?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 2,
    explanation: 'PUT is used to update/replace an existing resource. PATCH can also be used for partial updates.'
  },
  {
    id: 'rest-2',
    question: 'What does it mean for REST to be "stateless"?',
    options: ['No data is stored', 'Each request contains all info needed', 'No authentication required', 'Server cannot handle multiple requests'],
    correctAnswer: 1,
    explanation: 'Stateless means each request from client to server must contain all the information needed to understand and process the request.'
  },
  {
    id: 'graphql-1',
    question: 'What problem does GraphQL primarily solve?',
    options: ['Slow databases', 'Over-fetching and under-fetching', 'Security vulnerabilities', 'Server scalability'],
    correctAnswer: 1,
    explanation: 'GraphQL allows clients to request exactly the data they need, preventing over-fetching (getting too much data) and under-fetching (needing multiple requests).' 
  },
  {
    id: 'graphql-2',
    question: 'Which is NOT a valid GraphQL operation type?',
    options: ['Query', 'Mutation', 'Subscription', 'Command'],
    correctAnswer: 3,
    explanation: 'The three GraphQL operation types are Query (read), Mutation (write), and Subscription (real-time updates).'
  },
  {
    id: 'ws-1',
    question: 'What is a key characteristic of WebSocket connections?',
    options: ['Request-response only', 'Half-duplex', 'Full-duplex persistent', 'Connectionless'],
    correctAnswer: 2,
    explanation: 'WebSockets provide full-duplex (bidirectional) communication over a single persistent connection.'
  },
  {
    id: 'grpc-1',
    question: 'What serialization format does gRPC use by default?',
    options: ['JSON', 'XML', 'Protocol Buffers', 'MessagePack'],
    correctAnswer: 2,
    explanation: 'gRPC uses Protocol Buffers (protobuf) for efficient binary serialization.'
  },
  {
    id: 'grpc-2',
    question: 'Which transport protocol does gRPC use?',
    options: ['HTTP/1.1', 'HTTP/2', 'WebSocket', 'TCP Raw'],
    correctAnswer: 1,
    explanation: 'gRPC is built on HTTP/2, enabling features like multiplexing, streaming, and header compression.'
  },
  {
    id: 'soap-1',
    question: 'What describes the service contract in SOAP?',
    options: ['OpenAPI', 'GraphQL Schema', 'WSDL', 'Proto file'],
    correctAnswer: 2,
    explanation: 'WSDL (Web Services Description Language) describes the operations, messages, and endpoints of a SOAP service.'
  },
  {
    id: 'compare-1',
    question: 'Which API style is best for real-time chat applications?',
    options: ['REST', 'GraphQL', 'WebSocket', 'SOAP'],
    correctAnswer: 2,
    explanation: 'WebSocket is ideal for real-time applications due to its persistent, bidirectional connection capability.'
  },
  {
    id: 'compare-2',
    question: 'Which is generally most efficient for mobile network usage?',
    options: ['SOAP', 'REST with JSON', 'GraphQL', 'gRPC'],
    correctAnswer: 3,
    explanation: 'gRPC with Protocol Buffers offers the most compact binary format, reducing bandwidth usage significantly.'
  }
];

export const learningTips = [
  {
    title: 'Start with REST',
    description: 'REST is the most common API style. Master HTTP methods, status codes, and JSON before moving to other protocols.',
    icon: '📚'
  },
  {
    title: 'Understand the Problem',
    description: 'Each API style solves different problems. Choose based on your use case, not just trends.',
    icon: '🎯'
  },
  {
    title: 'Try Them All',
    description: 'Build the same simple app (like a todo list) using each API style to feel the differences.',
    icon: '🛠️'
  },
  {
    title: 'Read Real APIs',
    description: 'Study public APIs like GitHub REST, Shopify GraphQL, or Twitter API to see real-world patterns.',
    icon: '🔍'
  },
  {
    title: 'Security Matters',
    description: 'Every API style needs authentication, rate limiting, and input validation. Don\'t overlook security.',
    icon: '🔒'
  }
];
