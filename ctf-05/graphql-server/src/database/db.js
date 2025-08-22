const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          reject(err);
        }
      });

      // Create posts table (example data)
      db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          author_id INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (author_id) REFERENCES users (id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating posts table:', err);
          reject(err);
        } else {
          console.log('Database tables initialized successfully');
          
          // Create sample users for CTF challenge
          createSampleUsers().then(() => {
            resolve();
          }).catch((err) => {
            console.error('Error creating sample users:', err);
            resolve(); // Don't fail if sample users already exist
          });
        }
      });
    });
  });
};

// Create sample users for CTF challenge
const createSampleUsers = async () => {
  const bcrypt = require('bcryptjs');
  
  const sampleUsers = [
    { username: 'johndoe', email: 'j.doe@example.com', password: '4^FM6C#58&1#YQn2Bro)8H(=', role: 'user' },
  ];
  
  for (const user of sampleUsers) {
    try {
      const existingUser = await dbHelpers.findUserByEmail(user.email);
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        await dbHelpers.createUserWithRole(user.username, user.email, hashedPassword, user.role);
        console.log(`Created sample user: ${user.username} (${user.role})`);
      }
    } catch (error) {
      // User might already exist, continue
    }
  }
};

// Database query helpers
const dbHelpers = {
  // User operations
  createUser: (username, email, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
      stmt.run([username, email, hashedPassword], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username, email, role: 'user' });
        }
      });
      stmt.finalize();
    });
  },

  createUserWithRole: (username, email, hashedPassword, role = 'user') => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)');
      stmt.run([username, email, hashedPassword, role], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username, email, role });
        }
      });
      stmt.finalize();
    });
  },

  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, username, email, role, created_at FROM users', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  updateUserRole: (userId, newRole) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
      stmt.run([newRole, userId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
      stmt.finalize();
    });
  },

  // Post operations
  createPost: (title, content, authorId) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)');
      stmt.run([title, content, authorId], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, title, content, author_id: authorId });
        }
      });
      stmt.finalize();
    });
  },

  getAllPosts: () => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT p.*, u.username as author_username 
        FROM posts p 
        JOIN users u ON p.author_id = u.id 
        ORDER BY p.created_at DESC
      `, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getPostsByAuthor: (authorId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM posts WHERE author_id = ? ORDER BY created_at DESC', [authorId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

module.exports = {
  db,
  initializeDatabase,
  dbHelpers
};

