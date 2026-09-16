# XBlogApp

XBlogApp is a full-stack blogging application built using the MERN stack. It allows users to create an account, log in securely, create and manage blog posts, and view their profile and posts.

## Live Application

- Frontend: https://xblogapp.vercel.app/
- Backend API: https://xblogapp-jz82.onrender.com/
- GitHub Repository: https://github.com/Rahul-PuriRepo/xblogapp

## Tech Stack

### Frontend

- React
- React Router
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- CORS
- dotenv

## Features

- User registration and login
- JWT-based authentication
- Password hashing using bcryptjs
- Protected user routes
- User profile
- Create blog posts
- View and manage personal posts
- Edit posts
- Delete posts
- Search posts by keyword
- Filter posts by tags
- Comment functionality
- Google login/signup UI options
- Responsive frontend interface

## Project Structure

```text
XBlogApp/
├── assessment/
│   └── cypress/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Signup.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rahul-PuriRepo/xblogapp.git
cd xblogapp
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies
```bash
cd server
npm install
```

### 4. Environment Variables
```
Create a .env file inside the server directory.
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Running the application locally

Start the Backend

From the server directory:
```
npm start
```

The backend runs on: 
```
http://localhost:5000
```

Start the Frontend

From the client directory:
```
npm run dev
```

The frontend runs on: 
```
http://localhost:3000
```

## Production Deployment

The application is deployed using:

Vercel for the React frontend
Render for the Express backend
MongoDB Atlas for the database

The production frontend communicates with the deployed Render backend API.

Production Links
```
Frontend: https://xblogapp.vercel.app/
Backend API: https://xblogapp-jz82.onrender.com/
```

## Testing

The project includes Cypress assessment tests.

Run the complete assessment from the assessment directory:
```
npx cypress run --spec "cypress/e2e/spec.cy.js"
```

The final assessment completed successfully with all 25 tests passing.

## Security
```
Passwords are hashed using bcryptjs before being stored.
JWT is used for authentication and protected routes.
Database credentials and JWT secrets are stored in environment variables.
CORS is configured on the backend.
Private environment variables should not be exposed in public repositories.
```

## Author

Rahul Puri

GitHub: https://github.com/Rahul-PuriRepo
