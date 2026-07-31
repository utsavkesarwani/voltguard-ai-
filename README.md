# VoltGuard AI

> AI-powered electrical fault detection SaaS — Upload an image, get an AI safety report.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite + React + TailwindCSS + Framer Motion |
| Backend | Node.js + Express + MongoDB (Mongoose) |
| AI | Google Gemini Vision API |
| Upload | Multer (disk storage) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd voltguard-ai
```

### 2. Set up environment variables

**Server:**
```bash
cd server
cp .env.example .env
# Fill in MONGO_URI and GEMINI_API_KEY
```

**Client:**
```bash
cd client
cp .env.example .env
# VITE_API_URL is pre-set to http://localhost:5000/api
```

### 3. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

### 4. Run development servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Starts on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Starts on http://localhost:5173
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analyze` | Upload image for AI analysis |
| GET | `/api/history` | Get paginated report history |
| GET | `/api/report/:id` | Get single report by ID |
| GET | `/api/stats` | Dashboard aggregate stats |
| GET | `/api/health` | Server health check |

---

## Routes (Frontend)

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/detect` | Upload image for analysis |
| `/result/:id` | View AI analysis report |
| `/dashboard` | Reports history and stats |

---

## Build for Production

```bash
# Client
cd client && npm run build

# Server — just deploy the server/ folder to your Node.js host
```

---

## Phase Progress

- [x] Phase 0 — Project Scaffolding
- [x] Phase 1 — Landing Page UI (static)
- [x] Phase 2 — Component Library  
- [x] Phase 3 — Routing & Page Shells
- [x] Phase 4 — Express Backend (mock AI)
- [ ] Phase 5 — Gemini Vision Integration
- [ ] Phase 6 — MongoDB Hardening
- [ ] Phase 7 — Frontend ↔ Backend wiring
- [ ] Phase 8 — Animation Polish
- [ ] Phase 9 — Loading/Error States
- [ ] Phase 10 — Production Optimization
