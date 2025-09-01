# AdminPortal

Minimal React app (Create React App structure) for administrators. Includes:
- Login page (auth via API Gateway)
- Dashboard page fetching summary data from Gateway
- Routing via react-router-dom
- API calls via axios
- Simple auth token storage in localStorage

## Prerequisites
- Node.js LTS (>=16)
- npm or yarn

## Setup
1. Copy `.env.example` to `.env` and set values:
```
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_SITE_URL=http://localhost:3000
```

2. Install dependencies:
```
npm install
```

## Run
```
npm start
```
App runs on http://localhost:3000

## Build
```
npm run build
```

## Gateway API assumptions
- POST /auth/login { email, password } -> { access_token, token_type }
- GET /admin/summary with Authorization: Bearer <token> -> { totalUsers, activeOrders, revenue }

If these are not available, the app falls back to mocked responses when `REACT_APP_API_BASE_URL` is empty or the request fails with network error.

## Project structure
```
AdminPortal/
  src/
    api/
      client.js
      auth.js
    components/
      NavBar.jsx
      ProtectedRoute.jsx
    pages/
      Login.jsx
      Dashboard.jsx
    App.jsx
    index.js
```

## Notes
- Tokens are stored in `localStorage` under `admin_access_token`.
- Replace mocked endpoints as your Gateway becomes available.
