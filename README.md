# 🚗 Vehicle Rental System

A complete backend API for managing vehicle rentals, users, bookings, and secure role-based authentication.

🔗 **Live Deployment:** https://vehiclerentaslsystem.vercel.app/  
🔗 **GitHub Repository:** https://github.com/SojiburAsif/Vehicle-Rental-System.git

---

## 📌 Project Overview

This backend system covers full workflow of a rental service:

- **User Management** (Admin & Customer)
- **Vehicle Inventory Management**
- **Booking System with date-wise rent calculation**
- **JWT Authentication & Authorization**
- **Role-Based Access Control (RBAC)**

---

## 🚀 Features

### 🔐 Authentication
- JWT Login & Register  
- Secure password hashing  
- Token-protected routes  
- Auto reject unauthorized access  

---

### 👤 User Management
- Get all users  
- Get single user  
- Update profile  
- Admin can update any user  
- Customer can update only their own profile  
- Password removed from API responses  

---

### 🚘 Vehicle Management
- Add new vehicles  
- Update vehicle details  
- Delete vehicles  
- Vehicles cannot have duplicate registration numbers  
- Track availability:  
  - `available`  
  - `booked`  
  - `unavailable`  

---

### 📅 Booking System
- Book a vehicle  
- Auto calculation:  
  - total rental days  
  - total cost  
- Prevent double booking  
- Return vehicles and update status  
- Booking status flow:  
  - `active`  
  - `cancelled`  
  - `completed`  

---

## 🛠️ Tech Stack

| Category | Technology |
|---------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM / Query | node-postgres (pg) |
| Auth | JWT, bcrypt |
| Deployment | Vercel |
| Environment | dotenv |
| Language | TypeScript |

---

## 📁 Project Structure

📦 vehicle-rental-system
├── 📁 src
│ ├── app.ts
│ ├── server.ts (optional)
│ │
│ ├── 📁 config
│ │ ├── config.ts
│ │ └── db.ts
│ │
│ ├── 📁 middleware
│ │ └── logger.ts
│ │
│ ├── 📁 modules
│ │ ├── 📁 auth
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ └── auth.route.ts
│ │ │
│ │ ├── 📁 users
│ │ │ ├── user.controller.ts
│ │ │ ├── user.service.ts
│ │ │ └── user.route.ts
│ │ │
│ │ ├── 📁 vehicles
│ │ │ ├── vehicles.controller.ts
│ │ │ ├── vehicles.service.ts
│ │ │ └── vehicles.route.ts
│ │ │
│ │ └── 📁 bookings
│ │ ├── booking.controller.ts
│ │ ├── booking.service.ts
│ │ └── booking.route.ts
│ │
│ ├── types.d.ts (if needed)
│ └── utils.ts (if needed)
│
├── .env.example
├── tsconfig.json
├── package.json
├── README.md
└── vercel.json (if deployed)




## 📌 API Endpoints Summary

### 🔐 Auth
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`

### 👤 Users
- GET `/api/v1/users`
- GET `/api/v1/users/:id`
- PUT `/api/v1/users/:id`

### 🚘 Vehicles
- POST `/api/v1/vehicles`
- GET `/api/v1/vehicles`
- GET `/api/v1/vehicles/:id`
- PUT `/api/v1/vehicles/:id`
- DELETE `/api/v1/vehicles/:id`

### 📅 Bookings
- POST `/api/v1/bookings`
- GET `/api/v1/bookings`
- PUT `/api/v1/bookings/:id` (cancel/return)

