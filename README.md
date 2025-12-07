# 🚗 Vehicle Rental System

A complete backend API for managing vehicle rentals, users, bookings, and secure role-based authentication.

🔗 **Live Deployment:** [Vehicle Rental System](https://vehiclerentaslsystem.vercel.app/)  
🔗 **GitHub Repository:** [GitHub Repo](https://github.com/SojiburAsif/Vehicle-Rental-System.git)

---

## 📌 Project Overview

This backend system covers the full workflow of a rental service:

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
  - `returned`  
....
---

## 🛠️ Tech Stack

| Category     | Technology        |
|--------------|------------------|
| Runtime      | Node.js          |
| Framework    | Express.js       |
| Database     | PostgreSQL       |
| ORM / Query  | node-postgres (pg) |
| Auth         | JWT, bcrypt      |
| Deployment   | Vercel           |
| Environment  | dotenv           |
| Language     | TypeScript       |

---

## 📁 Code Structure

Your implementation follows a **modular pattern** with clear separation of concerns:

- **Routes** → Define API endpoints  
- **Controllers** → Handle request/response logic  
- **Services** → Business logic & database queries  
- **Middleware** → Authentication & authorization checks  

---

## 📊 Database Tables

### Users
| Field   | Notes |
|---------|-------|
| id      | Auto-generated |
| name    | Required |
| email   | Required, unique |
| password| Required |
| phone   | Required |
| role    | `admin` or `customer` |

### Vehicles
| Field              | Notes |
|--------------------|-------|
| id                 | Auto-generated |
| vehicle_name       | Required |
| type               | `car`, `bike`, `van`, `SUV` |
| registration_number| Required, unique |
| daily_rent_price   | Required, positive |
| availability_status| `available` or `booked` |

### Bookings
| Field          | Notes |
|----------------|-------|
| id             | Auto-generated |
| customer_id    | Links to Users table |
| vehicle_id     | Links to Vehicles table |
| rent_start_date| Required |
| rent_end_date  | Required, must be after start date |
| total_price    | Required, positive |
| status         | `active`, `cancelled`, `returned` |

---

## 🔐 Authentication & Authorization

### User Roles
- **Admin** → Full system access to manage vehicles, users, and all bookings  
- **Customer** → Can register, view vehicles, and manage own bookings  

### Flow
- Passwords hashed using **bcrypt**  
- Login via `/api/v1/auth/signin` → returns **JWT**  
- Protected endpoints require:  


- Unauthorized → `401`  
- Forbidden → `403`  

---

## 📌 API Endpoints Summary

### 🔐 Auth
- `POST /api/v1/auth/signup` → Register new user  
- `POST /api/v1/auth/signin` → Login and receive JWT  

### 👤 Users
- `GET /api/v1/users` → Admin only  
- `PUT /api/v1/users/:id` → Admin or own profile  
- `DELETE /api/v1/users/:id` → Admin only  

### 🚘 Vehicles
- `POST /api/v1/vehicles` → Admin only  
- `GET /api/v1/vehicles` → Public  
- `GET /api/v1/vehicles/:id` → Public  
- `PUT /api/v1/vehicles/:id` → Admin only  
- `DELETE /api/v1/vehicles/:id` → Admin only  

### 📅 Bookings
- `POST /api/v1/bookings` → Customer or Admin  
- `GET /api/v1/bookings` → Role-based  
- `PUT /api/v1/bookings/:id` → Cancel (Customer) / Return (Admin)  

---



