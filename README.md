# 🏠 RentNest Backend API

A secure and scalable Rental Property Marketplace Backend built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

This REST API allows **Tenants**, **Landlords**, and **Admins** to manage rental properties, rental requests, online payments, and reviews.

---

# 🚀 Live API

https://rentnest-backend-1.onrender.com

## 🌐 Production Usage

The backend API is deployed on Render and is available through the live API URL above.

For complete API testing, request examples, authentication flow, and response examples, refer to the Postman documentation provided above.

### Health Check

GET /

Expected response:

```json
{
  "success": true,
  "message": "RentNest API is running..."
}


# 🔗 Repository

https://github.com/talha-87/RentNest-Backend

# 🔗 Postman Documentation:
https://documenter.getpostman.com/view/55138457/2sBY4VHwfZ



---

# 📌 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-based Authorization

---

## 👤 Tenant Features

- Browse Properties
- View Property Details
- Submit Rental Requests
- View Rental History
- View Rental Details
- Make Secure Payments using Stripe
- View Payment History
- Leave Reviews after Successful Payment

---

## 🏠 Landlord Features

- Create Property
- Update Property
- Delete Property
- View Rental Requests
- Approve Rental Requests
- Reject Rental Requests

---

## 👨‍💼 Admin Features

- View All Users
- Ban / Unban Users
- View All Properties
- View All Rental Requests

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| TypeScript | Programming Language |
| PostgreSQL | Database |
| Prisma ORM | ORM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Zod | Request Validation |
| Stripe | Payment Gateway |

---

# 📁 Folder Structure

```text
src
│
├── app
│   ├── modules
│   ├── middleware
│   ├── routes
│   ├── errors
│   ├── utils
│   └── config
│
├── db
├── app.ts
└── server.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/talha-87/RentNest-Backend.git
```

Go to the project directory

```bash
cd RentNest-Backend
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES_IN=7d

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

---

## Categories

| Method | Endpoint |
|--------|----------|
| POST | /api/categories |
| GET | /api/categories |

---

## Properties

| Method | Endpoint |
|--------|----------|
| POST | /api/properties |
| GET | /api/properties |
| GET | /api/properties/:id |
| PATCH | /api/properties/:id |
| DELETE | /api/properties/:id |

---

## Rentals

| Method | Endpoint |
|--------|----------|
| POST | /api/rentals |
| GET | /api/rentals |
| GET | /api/rentals/:id |
| GET | /api/rentals/landlord/requests |
| PATCH | /api/rentals/landlord/requests/:id |

---

## Payments

| Method | Endpoint |
|--------|----------|
| POST | /api/payments/create |
| POST | /api/payments/confirm |
| GET | /api/payments |
| GET | /api/payments/:id |

---

## Reviews

| Method | Endpoint |
|--------|----------|
| POST | /api/reviews |

---

## Admin

| Method | Endpoint |
|--------|----------|
| GET | /api/admin/users |
| PATCH | /api/admin/users/:id |
| GET | /api/admin/properties |
| GET | /api/admin/rentals |

---

# 📦 API Response Format

## Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errorDetails": {}
}
```

---

# 👨‍💼 Admin Credentials

```text
Email    : admin@rentnest.com
Password : ********
```

> Replace the password with your actual admin password before submission.

---

# 🧪 Validation

- Zod Validation
- JWT Authentication
- Role-based Authorization
- Global Error Handling
- Structured Error Response

---

# 💳 Payment Gateway

- Stripe Payment Integration
- Payment Confirmation
- Payment Status Tracking
- Payment History

---

# 🚀 Future Improvements

- Image Upload (Cloudinary)
- Email Notifications
- Wishlist Feature
- Advanced Search & Filters
- Pagination
- Property Analytics Dashboard

---

# 👨‍💻 Author

**Md Naim**

Backend Developer

---

# 📄 License

This project is developed for the **Programming Hero Level-2 Backend Assignment**.