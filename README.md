CoinSensei – Budget Planner

A full‑stack personal finance app for uploading statements or SMS text, auto‑extracting transactions with AI, categorizing expenses, and tracking budgets with persistence.

Features
- Upload or paste SMS/email text; server extracts transaction JSON (description, amount, category, date, merchant, confidence)
- Rule‑based category fallback (Food, Transport, Shopping, Groceries, Health, Education, Entertainment)
- Manage transactions (add/edit/delete) with persistence
- Charts and summaries (spending by month/category)
- Modern UI with Wouter, Tailwind, and shadcn‑ui components

Tech Stack
- Client: React 18, Vite, Wouter, Tailwind, Chart.js
- Server: Express, Vite dev middleware, OpenAI (server‑side), file‑backed JSON persistence
- Shared: TypeScript, Zod/Drizzle types for future DB expansion

Project Structure
```
client/               # React app (Vite)
server/               # Express server + Vite integration
shared/               # Shared types/schemas
.local/transactions.json  # File‑backed store (created at runtime)
vite.config.ts        # Vite config for client build
server/index.ts       # Server entry
server/routes.ts      # API routes (extract + transactions CRUD)
```

Prerequisites
- Node.js 18+
- An OpenAI API key if you want AI extraction (server‑side): set `OPENAI_API_KEY`

Getting Started (Development)
1) Install deps
```
npm install
```
2) Set environment variable (PowerShell example)
```
$env:OPENAI_API_KEY="sk‑..."
```
3) Run dev server (serves API and client on the same port)
```
npm run dev
```
4) Open the app at http://localhost:5000

Build & Run (Production)
```
# build client and server bundle
npm run build

# start server (serves dist/public)
npm start
```

Key Workflows
- Extract from SMS (Upload page)
  1. Paste SMS, click “Extract with AI”
  2. Server calls `/api/extract` (OpenAI + robust regex fallback)
  3. App navigates to Analysis with the Add Transaction form prefilled

- Manage Transactions (Analysis page)
  - Load: on mount via `GET /api/transactions`
  - Add: form → `POST /api/transactions` → persists to `.local/transactions.json`
  - Edit: inline editable row → `PUT /api/transactions/:id`
  - Delete: `DELETE /api/transactions/:id` then re‑fetch list

Persistence
- Transactions are stored in `.local/transactions.json` (created automatically)
- Data survives refresh and dev restarts

API Overview
- `POST /api/extract`
  - Body: `{ text: string }`
  - Returns: `{ description, amount, category, date, merchant, confidence }`
- `GET /api/transactions` → `Transaction[]`
- `POST /api/transactions` → create one or many
- `PUT /api/transactions/:id` → update by id
- `DELETE /api/transactions/:id` → remove by id

Environment
- `OPENAI_API_KEY`: required for best results; if unset, extraction falls back to deterministic parsing (amount/date/merchant) and rule‑based categories

Notes
- Caching is disabled on API responses and the client fetches with `no-store` to prevent stale reads after mutating actions
- Categories default to “Uncategorized” when they can’t be inferred

Troubleshooting
- Extraction returns empty/incorrect:
  - Verify `OPENAI_API_KEY` is set and server restarted
  - Check Network tab for `/api/extract` response body
- Delete doesn’t persist:
  - Inspect `.local/transactions.json` after delete
  - Confirm `DELETE /api/transactions/:id` = 200 and next `GET` excludes the id

License
MIT


