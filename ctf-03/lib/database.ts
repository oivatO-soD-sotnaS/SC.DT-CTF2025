import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const dbPath = path.join(process.cwd(), 'forum.db');

// Create a database connection
export const db = new sqlite3.Database(dbPath);

// Promisify database methods for async/await usage
export const dbRun = promisify(db.run.bind(db));
export const dbGet = promisify(db.get.bind(db));
export const dbAll = promisify(db.all.bind(db));

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Create users table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create messages table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Insert some hard-coded messages
    const existingMessages = await dbGet('SELECT COUNT(*) as count FROM messages');
    if (existingMessages.count === 0) {
      await insertSeedData();
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Insert seed data with hard-coded messages
async function insertSeedData() {
  try {
    // Create a default admin user
    await dbRun(`
      INSERT INTO users (username, email, password_hash) 
      VALUES ('admin', 'admin@forum.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
    `);

    // Create a demo user
    await dbRun(`
      INSERT INTO users (username, email, password_hash) 
      VALUES ('demo_user', 'demo@forum.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
    `);

    // Insert hard-coded messages
    const hardCodedMessages = [
      {
        user_id: 1,
        username: 'admin',
        content: 'Welcome to our forum! This is the first message. Feel free to share your thoughts and engage with the community.'
      },
      {
        user_id: 2,
        username: 'demo_user',
        content: 'Hello everyone! Great to be part of this community. Looking forward to interesting discussions!'
      },
      {
        user_id: 1,
        username: 'admin',
        content: 'Remember to be respectful and follow the community guidelines. Happy posting!'
      },
      {
        user_id: 2,
        username: 'demo_user',
        content: 'This forum looks really nice! The interface is clean and easy to use.'
      },
      {
        user_id: 1,
        username: 'admin',
        content: 'We are constantly working to improve the user experience. Your feedback is always welcome!'
      }
    ];

    for (const message of hardCodedMessages) {
      await dbRun(`
        INSERT INTO messages (user_id, username, content) 
        VALUES (?, ?, ?)
      `, [message.user_id, message.username, message.content]);
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
    throw error;
  }
}

// User-related database functions
export async function createUser(username: string, email: string, passwordHash: string) {
  try {
    const result = await dbRun(`
      INSERT INTO users (username, email, password_hash) 
      VALUES (?, ?, ?)
    `, [username, email, passwordHash]);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await dbGet(`
      SELECT * FROM users WHERE username = ?
    `, [username]);
    return user;
  } catch (error) {
    console.error('Error getting user by username:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await dbGet(`
      SELECT * FROM users WHERE email = ?
    `, [email]);
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

// Message-related database functions
export async function getAllMessages() {
  try {
    const messages = await dbAll(`
      SELECT * FROM messages ORDER BY created_at ASC
    `);
    return messages;
  } catch (error) {
    console.error('Error getting all messages:', error);
    throw error;
  }
}

export async function createMessage(userId: number, username: string, content: string) {
  try {
    const result = await dbRun(`
      INSERT INTO messages (user_id, username, content) 
      VALUES (?, ?, ?)
    `, [userId, username, content]);
    return result;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

// Close database connection
export function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
  });
}

