import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from './database';
import { User, CreateUserData, LoginData } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function registerUser(userData: CreateUserData): Promise<{ success: boolean; message: string; user?: AuthUser }> {
  try {
    const { username, email, password } = userData;

    // Validate input
    if (!username || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    if (username.length < 3) {
      return { success: false, message: 'Username must be at least 3 characters long' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long' };
    }

    // Check if user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    await createUser(username, email, passwordHash);

    // Get the created user
    const newUser = await getUserByUsername(username) as any;
    if (!newUser) {
      return { success: false, message: 'Failed to create user' };
    }

    const authUser: AuthUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };

    return { 
      success: true, 
      message: 'User registered successfully', 
      user: authUser 
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
}

export async function loginUser(loginData: LoginData): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> {
  try {
    const { username, password } = loginData;

    // Validate input
    if (!username || !password) {
      return { success: false, message: 'Username and password are required' };
    }

    // Get user from database
    const user = await getUserByUsername(username) as any;
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return { success: false, message: 'Invalid username or password' };
    }

    // Create auth user object
    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    // Generate token
    const token = generateToken(authUser);

    return { 
      success: true, 
      message: 'Login successful', 
      user: authUser,
      token 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
}

