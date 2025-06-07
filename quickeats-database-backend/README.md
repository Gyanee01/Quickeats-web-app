# QuickEats Backend

## 🚀 Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file based on `.env.example`

3. Run server:

```bash
npm run dev
```

## 📦 API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/restaurants`
- `POST /api/restaurants`
- `PUT /api/restaurants/:id`
- `DELETE /api/restaurants/:id`
- `GET /api/menu/:restaurantId`
- `POST /api/orders`
- `GET /api/orders/:userId`
- `POST /api/payments/checkout-session`

Built with Node.js, Express, MongoDB, and JWT
