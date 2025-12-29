# 🛒 E-Store — Full Stack E-Commerce Platform

E-Store is a production-ready full-stack e-commerce application built with performance, scalability, and real-world workflows in mind. It supports multiple user roles, analytics dashboards, seller onboarding, and secure Stripe payments.

---

## 🚀 Core Features

### Authentication & Security
- Email signup with OTP verification
- JWT-based authentication (access & refresh tokens)
- Role-based authorization (User / Seller / Admin)

### User
- Browse products by category
- Cart management with persistent state
- Stripe-powered checkout
- Request seller access

### Seller
- Seller dashboard with analytics
- Add, update, and manage products

### Admin
- Admin analytics dashboard
- Promote or demote users
- Approve or reject seller requests
- Feature or unfeature products

### Payments
- Secure Stripe Checkout integration
- Order validation on backend
- Cart cleared after successful purchase

---

## 🧱 Tech Stack

Frontend:
- React
- React Router
- Zustand
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Stripe API

---

## ⚙️ Setup

### Clone Repository
```bash
git clone https://github.com/YashShrivastava2604/E-Store.git
cd E-Store
