# Gode and Million Car Market (ጎዴ እና ሚሊየን የመኪና መሸጫ) 🇪🇹

### Premier Automotive Marketplace — Bole Rwanda, Addis Ababa, Ethiopia

🌐 **Live Application URL**: **[https://gode-million-car-market.onrender.com](https://gode-million-car-market.onrender.com)**

A professional, bilingual (**Amharic / አማርኛ** & **English**) full-stack car marketplace web application for **Gode and Million Car Market** located in **Bole Rwanda (Near Edna Mall Road), Addis Ababa, Ethiopia**.

---

## 🌟 Live Demo & Quick Links

- 🚀 **Live Web App**: [https://gode-million-car-market.onrender.com](https://gode-million-car-market.onrender.com)
- 🏥 **API Health Check**: [https://gode-million-car-market.onrender.com/api/health](https://gode-million-car-market.onrender.com/api/health)
- 🚗 **Vehicle API**: [https://gode-million-car-market.onrender.com/api/cars](https://gode-million-car-market.onrender.com/api/cars)

---

## 🌟 Key Features

- **Zero-Config Persistent Database** — Built-in persistent JSON store with automatic seeding & atomic disk sync. No MongoDB or PostgreSQL connection needed for 1-click cloud deployments.
- **Direct Camera & Photo Upload** — Admin and sellers can upload photos from phone gallery, local storage, or take instant photos with device camera.
- **Bilingual Experience** — Instant toggle between English and native Amharic (Ethiopic Ge'ez script).
- **Professional Dealership Aesthetic** — High-contrast Tangerine (`#FF8C00`), deep midnight slate, and bright pearl white surfaces.
- **Addis Ababa Market Context**:
  - Live Ethiopian Birr (ETB) pricing with millions format (`13,500,000 ETB` / `13.5 ሚሊየን ብር`).
  - EV Zero-Excise Duty incentives (Volkswagen ID.4, BYD Song Plus).
  - Code 2 & Code 3 plate registrations, Libre / Customs Duty Paid verifications.
  - Telebirr, CBE Birr, and Awash Bank auto loan financing support.
- **Interactive Dealership Tools**:
  - Ethiopian Car Market Price Estimator algorithm.
  - Bank Loan & Financing Monthly Installment Calculator in ETB.
  - Side-by-side vehicle comparison matrix (up to 3 cars).
  - Showroom test drive booking system.
  - Direct WhatsApp and Telegram sharing with custom vehicle previews.

---

## 🔑 Default Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin (Showroom Manager)** | `admin@godemillion.et` | `Admin@123` |
| **Seller (Dealer)** | `seller@godemillion.et` | `Seller@123` |
| **Buyer (Customer)** | `buyer@godemillion.et` | `Buyer@123` |

---

## 💻 Local Development

```bash
# 1. Start Server (Express API + SPA static serve on port 5000)
cd server
npm install
npm start

# 2. Start Client Dev Server (Vite on port 5173)
cd client
npm install
npm run dev
```

- Local Dev URL: `http://localhost:5173`
- Local API URL: `http://localhost:5000`

---

## ☁️ Deployment on Render

This repository uses a unified single-service architecture.
1. Create a **Web Service** on [Render.com](https://dashboard.render.com).
2. Connect `https://github.com/Nathenael11/gode-million-car-market`.
3. Set **Build Command**: `npm run build` and **Start Command**: `npm start`.
4. Your application will be live at `https://gode-million-car-market.onrender.com`!

---

*Location: Bole Rwanda, Near Edna Mall Road, Addis Ababa, Ethiopia 🇪🇹*
