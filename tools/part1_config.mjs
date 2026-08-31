import fs from 'fs';
import path from 'path';

// Helper to write UTF-8 files cleanly without BOM
export function writeCleanUTF8(filePath, content) {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ [UTF8 Clean] Saved ${filePath}`);
}

// 1. Root package.json
export const packageJson = JSON.stringify({
  "name": "gode-million-car-market",
  "version": "1.0.0",
  "description": "Gode and Million Car Market (ጎዴ እና ሚሊየን የመኪና መሸጫ) - Premier Automotive Marketplace in Bole Rwanda, Addis Ababa, Ethiopia",
  "scripts": {
    "install:all": "npm --prefix server install && npm --prefix client install",
    "dev:server": "npm --prefix server run dev",
    "dev:client": "npm --prefix client run dev",
    "build": "npm --prefix client run build",
    "start": "npm --prefix server start"
  },
  "keywords": [
    "ethiopia",
    "car-market",
    "addis-ababa",
    "bole-rwanda",
    "amharic",
    "react",
    "express",
    "gode-million"
  ],
  "author": "Gode & Million Automotive Ethiopia",
  "license": "MIT"
}, null, 2);

// 2. Root README.md
export const readmeMd = `# Gode and Million Car Market (ጎዴ እና ሚሊየን የመኪና መሸጫ) 🇪🇹

A professional, bilingual (**Amharic / አማርኛ** & **English**) full-stack automotive marketplace web application built for **Gode and Million Car Market**, located in **Bole Rwanda (Near Edna Mall Road), Addis Ababa, Ethiopia**.

---

## 🌟 Key Highlights & Features

- **Zero-Config Persistent Database**: Built-in persistent database engine with automatic seed data & live disk persistence. Works out of the box on Render, Railway, or Docker with **zero external MongoDB setup required**.
- **Camera & Local Photo Upload**: Add vehicle listings with photos directly from device memory (gallery/disk) or live camera capture.
- **Bilingual (English & አማርኛ)**: Instant toggle with native Ethiopic typography support (\`Noto Sans Ethiopic\` & \`Plus Jakarta Sans\`).
- **Modern Executive Theme**: Vibrant Tangerine (\`#FF8C00\`), Warm Amber, Midnight Slate, and crisp Pearl White surfaces.
- **Addis Ababa Market Context**:
  - ETB currency formatting with million labels (\`13,500,000 ETB\` / \`13.5 ሚሊየን ብር\`).
  - EV Zero-Excise Duty incentive indicators (Volkswagen ID.4 CROZZ, BYD Song Plus EV).
  - Ethiopian plate codes (Code 2, Code 3) and Libre / Customs Duty Paid verifications.
  - Ethiopian phone validation (\`+251-9X-XXX-XXXX\` / \`09...\`).
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
  - Buyer, Seller, and Admin dashboards with vehicle inventory moderation.
  - Direct camera & photo upload from local memory.

---

## 🔑 Default Showroom Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | \`admin@godemillion.et\` | \`Admin@123\` |
| **Seller** | \`seller@godemillion.et\` | \`Seller@123\` |
| **Buyer** | \`buyer@godemillion.et\` | \`Buyer@123\` |

---

## 🚀 Quick Start

### 1. Start Server
\`\`\`bash
cd server
npm install
npm start
\`\`\`
Server runs at \`http://localhost:5000\` (\`/api/health\` for healthcheck).

### 2. Start Client
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
Client runs at \`http://localhost:5173\`.

---

## ☁️ Deployment

1. Connect this repository to **Render.com** or **Railway**.
2. Deploy using the included \`render.yaml\` Blueprint or run \`npm start\` in \`server\`.
3. The server serves both the frontend SPA and the REST API from port 5000 with seed data and persistence automatically!
`;
