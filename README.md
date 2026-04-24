# Course Selling Application

## Overview

The Course Selling Application is a full-stack web platform designed to enable users to explore and purchase online courses, while providing administrators with tools to create and manage course offerings. This project demonstrates best practices in backend development, authentication, database design, and scalable application structure.

## Key Features

### User Functionality

* User registration and authentication
* Browse all available courses
* Purchase courses
* View purchased courses

### Administrative Functionality

* Admin registration and authentication
* Create and manage courses
* Delete courses
* Add and update course content

## Technology Stack

**Backend**

* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT) for authentication
* dotenv for environment configuration

**Frontend (Pluggable)**

* EJS (for server-side rendering)
* React (for modern client-side application)

## Project Structure
project-root/
│
├── index.js
├── .env
├── package.json
│
├── routes/
│   ├── user.routes.js
│   └── admin.routes.js
│
├── models/
│   ├── user.model.js
│   ├── admin.model.js
│   ├── course.model.js
│   └── purchase.model.js
│
├── middleware/
│   ├── userAuth.middleware.js
│   └── adminAuth.middleware.js
│
└── frontend/ (optional)

## API Design

### User Endpoints

* `POST /user/signup` — Register a new user
* `POST /user/login` — Authenticate user
* `GET /courses` — Retrieve all courses
* `POST /courses/:courseId/purchase` — Purchase a course
* `GET /user/purchased-courses` — Retrieve purchased courses

### Admin Endpoints

* `POST /admin/signup` — Register a new admin
* `POST /admin/login` — Authenticate admin
* `POST /admin/course` — Create a course
* `DELETE /admin/course/:courseId` — Delete a course
* `PUT /admin/course/:courseId/content` — Update course content

## Database Schema Design

### User

* `email` (String, required, unique)
* `password` (String, required)
* `purchasedCourses` (Array of Course references)

### Admin

* `email` (String, required, unique)
* `password` (String, required)

### Course

* `title` (String, required)
* `description` (String)
* `price` (Number, required)
* `content` (String / Array)
* `creatorId` (Reference to Admin)

### Purchase

* `userId` (Reference to User)
* `courseId` (Reference to Course)
* `purchaseDate` (Date)
  
## Authentication & Authorization

* Token-based authentication using JWT
* Role-based access control via middleware

  * `userAuth` middleware for user-protected routes
  * `adminAuth` middleware for admin-restricted operations

## Environment Configuration

Create a `.env` file in the root directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

## Installation & Setup

1. Initialize the project:

```
npm init -y
```

2. Install dependencies:

```
npm install express mongoose jsonwebtoken dotenv
```

3. Run the application:

```
node index.js
```

(Optional)

```
npx nodemon index.js
```

## Enhancements (Recommended)

* Implement cookie-based authentication for improved security
* Add rate limiting middleware to prevent abuse
* Use input validation libraries (e.g., Zod)
* Integrate password hashing using bcrypt
* Structure routes using Express Router
* Add pagination and filtering for course listings

---

## Frontend Integration

* Basic UI using EJS templates
* Advanced frontend using React with REST API integration

## Future Scope

* Payment gateway integration
* Course progress tracking system
* Multimedia content support (video streaming)
* Analytics dashboard for administrators

## Author

Khushali Tiwari

## License

This project is intended for educational and demonstration purposes.

