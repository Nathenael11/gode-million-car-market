# Gode and Million Car Market
### Ethiopian Automotive Marketplace — Bole Rwanda, Addis Ababa

A bilingual **Amharic (Ethiopic) / English** full-stack car marketplace web application for **Gode and Million Car Market** (Bole Rwanda, Addis Ababa, Ethiopia).

---

## Features

- **Zero-Config Database** — Built-in persistent JSON store, no MongoDB or PostgreSQL setup needed
- **Camera & Local Photo Upload** — Add vehicle photos directly from device camera or local disk
- **Bilingual** — Switch between English and Amharic (Ethiopic script) instantly
- **Professional Design** — Warm tangerine (#FF8C00) primary color, executive slate + pearl white palette
- **Ethiopian Market Context** — ETB pricing, Telebirr/CBE Birr, plate codes, EV duty-free incentives
- **Tools** — Price estimator, financing calculator, compare drawer, test drive booking, QR code share
- **Role-Based Accounts** — Buyer, Seller, Admin dashboards

---

## Quick Start

```bash
# Server (port 5000)
cd server && npm install && npm start

# Client dev (port 5173)
cd client && npm install && npm run dev
```

Open: http://localhost:5173

---

## Demo Accounts

| Role   | Email                      | Password    |
|--------|----------------------------|-------------|
| Admin  | admin@godemillion.et       | Admin@123   |
| Seller | seller@godemillion.et      | Seller@123  |
| Buyer  | buyer@godemillion.et       | Buyer@123   |

---

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4
- **Backend**: Node.js 20 + Express 5
- **Database**: Zero-config persistent JSON (embedded, no setup)
- **Auth**: JWT tokens + bcrypt
- **Images**: Local disk upload (base64) + Unsplash CDN fallback

---

Built for Gode and Million Car Market. Bole Rwanda, Addis Ababa, Ethiopia.
