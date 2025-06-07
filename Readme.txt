# QuickEats - Food Delivery Web App

QuickEats is a web application for ordering food online from local restaurants. It allows users to browse menus, add items to their cart, authenticate, and track their orders live.

## Features

- Browse popular restaurants and cuisines
- Add food items to a cart and place orders
- User authentication (login/signup)
- View cart summary with taxes and delivery fee
- Live order tracking page with status updates
- Clean and responsive UI with minimal design

## Tech Stack

- Frontend: React, Tailwind CSS, Lucide Icons
- Backend: Node.js, Express
- Database: PostgreSQL
- Auth: JWT, bcrypt

## How to Use

1. Clone the repository:

2. Install dependencies for frontend:
cd quickeats-frontend
npm install

3. Start the frontend server on port 3001:
npm start

The app will be available at `http://localhost:3001`

4. Make sure the backend is already running on port 5000.

## Folder Structure

- `src/App.tsx` - Main application code
- `src/index.tsx` - React entry point
- `src/index.css` - Styling
- `public/index.html` - HTML shell
- `package.json` - React config (with port set to 3001)

## Order Tracking

The "Track Order" button leads to a page that shows the current status of the user's food order. Backend integration is expected to provide status data for this view.
