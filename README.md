# Trading Journal

A **local-first trading journal** built with **Next.js 16**, **TypeScript**, and **TailwindCSS**, supporting authentication with **NextAuth** (Google OAuth) and interactive charts with **Chart.js**. Track your trades, visualize profit/loss, and analyze your trading performance over time.

---

## Features

- **User Authentication**
  - Sign in with Google via **NextAuth**.
  - Secure server-side session handling.
- **Trade Management**
  - Add, update, delete trades.
  - Track trade date, pair, profit, and loss.
- **Dashboard**
  - **Summary Cards**: Total Profit, Total Loss, Net P/L.
  - **Charts**:
    - Profit vs Loss (Bar Chart)
    - Daily Net P/L (Line Chart)
    - Win/Loss Ratio (Doughnut Chart)
    - Pair Performance (Bar Chart)
    - Cumulative P/L (Line Chart)
  - Filter by month.
- **Responsive & Mobile Friendly**
  - Mobile-friendly sliding sidebar menu.
  - Sticky header with theme toggle.
- **Theme Support**
  - Light and dark themes with smooth transitions.
  - Dynamic chart colors based on theme.
- **Local-first Database**
  - Trades stored locally in **SQLite** via **better-sqlite3**.

---

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript, TailwindCSS
- **Authentication:** NextAuth
- **Charts:** Chart.js, react-chartjs-2
- **Database:** SQLite (local-first)
- **Icons & Fonts:** Google Fonts (Geist Sans & Geist Mono)
- **Styling:** CSS variables for theming, TailwindCSS utilities

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/trading-journal.git
cd trading-journal 
```

2. Install dependencies
```
pnpm install
# or
npm install
```

3. Environment Variables
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

# Project Structure

.
├─ app/
│  ├─ layout.tsx           # Root layout with ThemeProvider & Navbar
│  ├─ page.tsx             # Home page / Dashboard
│  ├─ signin/page.tsx      # Sign-in page
│  └─ trades/              # Trades CRUD pages
├─ components/
│  ├─ Navbar.tsx
│  ├─ NavbarClient.tsx
│  ├─ ThemeSwitcher.tsx
│  ├─ SummaryCards.tsx
│  └─ Charts/
│      ├─ ProfitLossBar.tsx
│      ├─ NetPLLine.tsx
│      ├─ WinLossDoughnut.tsx
│      └─ PairPerformanceBar.tsx
├─ lib/
│  ├─ auth.ts              # NextAuth config
│  ├─ db.ts                # SQLite connection
│  └─ queries.ts           # Server actions for trades
├─ hooks/
│  └─ useThemeColors.ts
├─ public/
├─ styles/
│  └─ globals.css
├─ package.json
└─ pnpm-lock.yaml

