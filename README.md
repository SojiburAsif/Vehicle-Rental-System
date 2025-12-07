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

