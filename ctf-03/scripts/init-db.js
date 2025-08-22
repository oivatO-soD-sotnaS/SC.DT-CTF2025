const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'forum.db');

// Create a database connection
const db = new sqlite3.Database(dbPath);

async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        // Create users table
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create messages table
        db.run(`
          CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            username TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
          )
        `);

        // Create FAQs table
        db.run(`
          CREATE TABLE IF NOT EXISTS faqs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
          )
        `);

        // Check if we need to insert seed data
        db.get('SELECT COUNT(*) as count FROM messages', async (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          if (row.count === 0) {
            await insertSeedData();
          }
          
          console.log('Database initialized successfully');
          resolve();
        });
      } catch (error) {
        console.error('Error initializing database:', error);
        reject(error);
      }
    });
  });
}

async function insertSeedData() {
  return new Promise((resolve, reject) => {
    // Hash password for demo users (password: "password")
    const passwordHash = bcrypt.hashSync('password', 10);

    db.serialize(() => {
      // Create default users
      db.run(`
        INSERT INTO users (username, email, password_hash) 
        VALUES ('admin', 'admin@forum.com', ?)
      `, [passwordHash]);

      db.run(`
        INSERT INTO users (username, email, password_hash) 
        VALUES ('demo_user', 'demo@forum.com', ?)
      `, [passwordHash]);

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

      let completed = 0;
      hardCodedMessages.forEach((message, index) => {
        db.run(`
          INSERT INTO messages (user_id, username, content) 
          VALUES (?, ?, ?)
        `, [message.user_id, message.username, message.content], (err) => {
          if (err) {
            reject(err);
            return;
          }
          completed++;
          if (completed === hardCodedMessages.length) {
            // Insert FAQ seed data
            insertFAQSeedData().then(() => {
              console.log('Seed data inserted successfully');
              resolve();
            }).catch(reject);
          }
        });
      });
    });
  });
}

async function insertFAQSeedData() {
  return new Promise((resolve, reject) => {
    const hardCodedFAQs = [
      {
        user_id: 1,
        title: 'How do I create an account?',
        content: 'To create an account, click on the "Sign In" button in the navigation bar and fill out the registration form with your username, email, and password. Your account will be created immediately and you\'ll be logged in automatically.'
      },
      {
        user_id: 1,
        title: 'How do I post a message?',
        content: 'Once you\'re logged in, you\'ll see a "Post a Message" form on the main feed page. Simply type your message (up to 1000 characters) and click "Post Message". Your message will appear in the forum immediately.'
      },
      {
        user_id: 2,
        title: 'Can I edit or delete my messages?',
        content: 'Currently, the forum doesn\'t support editing or deleting messages once they\'re posted. Please make sure to review your message before posting. This feature may be added in future updates.'
      },
      {
        user_id: 1,
        title: 'What are the community guidelines?',
        content: 'Please be respectful to all community members, avoid spam or inappropriate content, stay on topic, and help create a welcoming environment for everyone. Violations may result in account restrictions.'
      }
    ];

    let completed = 0;
    hardCodedFAQs.forEach((faq) => {
      db.run(`
        INSERT INTO faqs (user_id, title, content) 
        VALUES (?, ?, ?)
      `, [faq.user_id, faq.title, faq.content], (err) => {
        if (err) {
          reject(err);
          return;
        }
        completed++;
        if (completed === hardCodedFAQs.length) {
          resolve();
        }
      });
    });
  });
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log('Database setup complete');
    db.close();
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    db.close();
    process.exit(1);
  });

