E-Store: A Modern Full-Stack E-Commerce Platform

Built with the MERN stack, E-Store is a full-featured e-commerce platform designed for performance and a interactive user experience. Core features include real-time payment processing with Stripe, a granular role-based access system for Admins, Sellers, and Customers, secure JWT authentication, and Redis-backed caching for lightning-fast data delivery.

Live Demo : https://e-store-ql93.onrender.com

✨ Key Features
E-Store is designed with a three-tiered user system, providing a unique set of capabilities for each role.

👤 Customer Features
Stunning UI/UX: A highly interactive and visually appealing interface designed to make shopping a delightful experience.
"Living Orbs" Categories: Interactive orbs that come to life on hover and create a ripple effect on click.
Scroll Animations: Staggered "float-in" animations for category orbs as they enter the viewport.
Immersive Background: A live, interactive 3D Spline robot that acts as a central theme for the entire application.
Seamless Shopping Cart: Add, remove, and update item quantities with a state-of-the-art cart managed by Zustand.
Secure Payments: Full integration with Stripe Checkout for secure and easy transactions.
Product Discovery: Explore products through category pages, a "Featured Collection" carousel, and AI-driven "Recommended Products".

📈 Seller Features
Seller Dashboard: A dedicated dashboard for sellers to manage their own products.
Product Management: Sellers can create new products and delete their existing listings.
Onboarding: Regular users can formally request seller access, which an admin must approve.

🔐 Admin Features
Admin Dashboard: A comprehensive backend interface with exclusive administrative powers.
Full User Management: View all registered users and manage their roles (e.g., approve seller requests, demote sellers).
Full Product Management: Admins have universal control over all products, including the ability to mark any product as "featured."
Performance Analytics: View key metrics like total users, total products, sales, and revenue via a dashboard with integrated recharts.
Cache Management: Admins can manually clear the Redis cache for featured products.

🛠️ Tech Stack & Architecture

Frontend
Framework: React 19 (built with Vite for blazing-fast development).
Styling: Tailwind CSS 4 for a utility-first, highly maintainable design system.
State Management: Zustand, chosen for its simplicity, minimal boilerplate, and excellent performance. It manages global state for the user, cart, and products.
Animation: Framer Motion is used extensively to create fluid, performant animations, including the "Scroll Float" effect and the "Featured Collection" carousel.
3D/Graphics: @splinetool/react-spline for integrating the interactive 3D robot directly into the React component tree.

UI Components:
Icons: Lucide React for a clean, consistent set of icons.
Analytics Charts: Recharts for rendering beautiful and interactive charts in the admin dashboard.
Notifications: React Hot Toast for providing non-intrusive user feedback.

Backend
Runtime: Node.js.
Framework: Express.js, a minimalist and flexible web application framework.
Database: MongoDB with Mongoose as the ODM (Object Data Modeling) library for elegant data modeling and validation.
Authentication: A robust JWT (JSON Web Token) strategy with Access Tokens and Refresh Tokens. Tokens are stored securely in HttpOnly cookies to prevent XSS attacks. Passwords are encrypted using bcryptjs.
Caching: Redis (via Upstash) is used to cache database queries for frequently accessed data, like the list of featured products, dramatically reducing database load and speeding up response times.
Image & Asset Management: Cloudinary for powerful, cloud-based image uploading, storage, optimization, and delivery.
Payments: Stripe for handling all payment processing, including creating checkout sessions.
Email Service: Nodemailer with the Gmail SMTP server is used for sending transactional emails, such as OTP verification codes.

Deployment & Hosting
Platform: Deployed on Render.com.
Database: MongoDB Atlas.
Caching: Upstash serverless Redis.

🚀 Getting Started
To run this project locally, follow these steps:
Prerequisites
Node.js (v18.0 or later)
npm
MongoDB instance (local or via Atlas)
An Upstash (Redis) account
A Cloudinary account
A Stripe account
A Gmail account with an "App Password"

1. Clone the Repository
code
Bash
git clone https://github.com/your-username/e-commerce-app.git
cd e-commerce-app
2. Install Dependencies
The root package.json is configured to install dependencies for both the backend and frontend concurrently.
code
Bash
npm install
3. Environment Variables
Create a .env file in the backend directory. Use the .env.example below as a template and fill it with your own credentials.
code
Code
# .env.example

# --- Server & Database ---
PORT=5000
NODE_ENV=development
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>

# --- JWT Authentication ---
JWT_SECRET=<YOUR_JWT_SECRET_KEY>
JWT_REFRESH_SECRET=<YOUR_JWT_REFRESH_SECRET_KEY>

# --- Redis Caching via Upstash ---
UPSTASH_REDIS_URL=<YOUR_UPSTASH_REDIS_URL>

# --- Nodemailer for Email Service ---
EMAIL_USER=<YOUR_GMAIL_ADDRESS>
EMAIL_PASS=<YOUR_GMAIL_APP_PASSWORD>

# --- Cloudinary for Image Hosting ---
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

# --- Stripe for Payments ---
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
4. Run the Application
This command will start the backend server with nodemon and the frontend Vite dev server simultaneously.
code
Bash
npm run dev
The backend will be running on http://localhost:5000 and the frontend on http://localhost:5173.
