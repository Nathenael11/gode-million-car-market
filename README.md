# Gode and Million Car Market (?? ?? ???? ???? ???) ????

A professional, bilingual (Amharic & English) full-stack automotive marketplace web application built for **Gode and Million Car Market**, located in **Bole Rwanda, Addis Ababa, Ethiopia**.

---

## ?? Key Highlights & Features

- **Zero-Config Persistent Database**: Built-in file-backed JSON database with automatic seed data & persistent disk sync. **Zero external database setup needed** (no MongoDB Atlas or connection headaches during deployment).
- **Bilingual (English & ????)**: Instant toggle with comprehensive typography support (`Noto Sans Ethiopic` & `Plus Jakarta Sans`).
- **Tangerine Theme**: Primary Tangerine (`#FF8C00`), Dark Tangerine (`#E07B00`), Deep Black, and subtle Ethiopian flag accents (Green, Yellow, Red).
- **Custom Vector Logo**: Dynamic car silhouette + Amharic typography "?? ?? ????" + ???? badge.
- **Ethiopian Context**:
  - ETB currency formatting with million labels (`13,500,000 ETB` / `13.5 ???? ??`).
  - EV Zero-Excise Duty incentive indicators (Volkswagen ID.4 CROZZ, BYD Song Plus EV).
  - Ethiopian plate codes (Code 2, Code 3) and Libre / Customs Duty Paid verifications.
  - Ethiopian phone validation (`+251-9X-XXX-XXXX` / `09...`).
  - Showroom Location: Bole Rwanda, Addis Ababa with interactive map, contact details, and test track bookings.
  - Payment & Financing Partners: Telebirr, CBE Birr, Awash Bank auto loans, Nyala Insurance, and German Auto inspection.
- **Interactive Tools**:
  - Ethiopian Car Market Price Estimator algorithm.
  - Bank Financing & Auto Loan monthly payment calculator in ETB.
  - Vehicle Side-by-Side comparison drawer (up to 3 vehicles).
  - Showroom Test Drive booking system.
  - Instant mobile QR code generator.
  - Social sharing to Telegram, WhatsApp, and Facebook.
- **Role-Based Portals**:
  - Buyer, Seller, and Admin dashboards.
  - Vehicle submission with image gallery and Ethiopian specs.
  - Admin analytics and listing moderation.

---

## ?? Default Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@godemillion.et` | `Admin@123` |
| **Seller** | `seller@godemillion.et` | `Seller@123` |
| **Buyer** | `buyer@godemillion.et` | `Buyer@123` |

---

## ?? Quick Start

### 1. Start Server
```bash
cd server
npm install
npm start
```
Server runs at `http://localhost:5000` (`/api/health` for healthcheck).

### 2. Start Client
```bash
cd client
npm install
npm run dev
```
Client runs at `http://localhost:5173`.

---

## ?? Deployment on Render.com

This repository is 100% self-contained with zero database configuration needed:
1. Connect this repo to **Render.com**.
2. Deploy using the included `render.yaml` Blueprint or create a Web Service for `server` and Static Site for `client`.
3. It will run immediately with seed data and full persistence!
