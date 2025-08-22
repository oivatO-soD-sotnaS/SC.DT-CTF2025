# Community Forum Application

A modern, responsive forum application built with Next.js, Tailwind CSS, ShadCN UI, and SQLite3. This application provides user authentication and messaging functionality with a clean, professional interface.

## 🚀 Live Demo

**Deployed Application:** https://3000-ildwfaq334psqu85gyah0-8023fc20.manusvm.computer

## ✨ Features

### Core Functionality
- **User Authentication**: Complete registration and login system with secure password hashing
- **Forum Messaging**: View and post messages in a single forum
- **Hard-coded Messages**: Pre-populated with sample messages for demonstration
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Messages update dynamically after posting

### Technical Features
- **Secure Authentication**: JWT-based authentication with HTTP-only cookies
- **Password Security**: Bcrypt password hashing
- **SQLite Database**: Lightweight, file-based database for easy deployment
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: SQLite3
- **Authentication**: JWT, bcryptjs
- **Deployment**: Node.js production server

## 📦 Project Structure

```
forum-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   ├── register/route.ts
│   │   │   │   └── me/route.ts
│   │   │   └── messages/route.ts
│   │   ├── globals.css
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── textarea.tsx
│   │   ├── AuthForm.tsx
│   │   ├── Forum.tsx
│   │   ├── MessageForm.tsx
│   │   └── MessageList.tsx
│   └── contexts/
│       └── AuthContext.tsx
├── lib/
│   ├── auth.ts
│   └── database.ts
├── types/
│   └── index.ts
├── scripts/
│   └── init-db.js
├── forum.db
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd forum-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database**
   ```bash
   node scripts/init-db.js
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 👥 Demo Accounts

The application comes with pre-configured demo accounts:

- **Admin Account**
  - Username: `admin`
  - Password: `password`

- **Demo User Account**
  - Username: `demo_user`
  - Password: `password`

## 🎯 Usage

### For New Users
1. Click "Login / Register" button
2. Switch to "Register" tab
3. Fill in username, email, and password
4. Click "Register" to create your account
5. You'll be automatically logged in

### For Existing Users
1. Click "Login / Register" button
2. Enter your username and password
3. Click "Login"

### Posting Messages
1. Once logged in, you'll see the "Post a Message" form
2. Type your message (up to 1000 characters)
3. Click "Post Message"
4. Your message will appear in the forum immediately

### Viewing Messages
- All messages are displayed in chronological order
- Each message shows the author's username and timestamp
- Messages include user avatars (first letter of username)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for custom configuration:

```env
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

### Database
The SQLite database (`forum.db`) is created automatically when you run the initialization script. It includes:

- **Users table**: Stores user accounts with hashed passwords
- **Messages table**: Stores forum messages with user references

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update ShadCN UI theme in `components.json`
- Customize Tailwind configuration in `tailwind.config.js`

### Features
- Add new API routes in `src/app/api/`
- Create new components in `src/components/`
- Extend database schema in `lib/database.ts`

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Tokens stored in secure cookies
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🐛 Troubleshooting

### Common Issues

1. **Database not found**
   - Run `node scripts/init-db.js` to initialize the database

2. **Port already in use**
   - Change the port: `PORT=3001 npm start`

3. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Next.js cache: `rm -rf .next`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

Built with ❤️ using Next.js, Tailwind CSS, and ShadCN UI.
