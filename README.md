# Bengal E-Seva

Bengal E-Seva is a full-stack appointment booking and service tracking platform built with React, Node.js, Express, and MongoDB. It enables citizens to request appointments, track service status, and provides an admin dashboard for managing departments and appointments.

## Features

- User signup and login
- Appointment booking form
- Service status tracking
- Admin dashboard for appointment and department management
- MongoDB backend with Mongoose models
- Clean React UI with responsive layout

## Repository Structure

- `backend/` — Express API, MongoDB connection, authentication, and appointment management
- `frontend/` — React app built with Vite, forms, routes, and UI components

## Getting Started

### 1. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with these values:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

Start the backend server:

```bash
npm run dev
```

If you need to seed an admin user:

```bash
npm run seed:admin
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal to use the app.

## Notes

- Ensure your MongoDB Atlas cluster allows connections from your IP or from `0.0.0.0/0` during development.
- The backend uses JWT authentication and requires the correct `JWT_SECRET` value for login/signup flows.

## Scripts

### Backend

- `npm run dev` — start backend with nodemon
- `npm start` — run backend normally
- `npm run seed:admin` — seed default admin data

### Frontend

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Technologies

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- Axios

## License

This project can be customized for personal or educational use. Add a license file if needed.
