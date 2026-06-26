# ChadWallet

A **fomo.family-style** landing page and trading UI for **ChadWallet** — a Solana-native crypto trading app.

## Features

- **Landing Page** — Hero, features, rotating token banners, app store links
- **Trading Page** — Trending tokens list, candlestick price chart, live trades feed, buy/sell panel
- **Privy Auth** — Sign in with Google/Apple, embedded Solana wallet creation
- **Real Data** — Jupiter Price API for live token prices, Jupiter Quote API for swap quotes
- **Codex.io** — OHLCV chart data (with mock fallback when API key not set)
- **Responsive** — Mobile-first design with dark theme and yellow ChadWallet branding

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **Privy** — Auth + embedded wallets
- **Jupiter** — Token prices + swap quotes
- **Codex.io** — Chart bars (GraphQL)
- **lightweight-charts** — Candlestick charts
- **Lucide React** — Icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
CODEX_API_KEY=your-codex-api-key          # optional, falls back to mock data
```

To get your Privy app ID:
1. Go to [Privy Dashboard](https://dashboard.privy.io)
2. Create a new app
3. Enable Google and Apple login methods
4. Enable Solana embedded wallets
5. Copy the App ID

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, token banners, download CTAs |
| `/trade/[address]` | Trading page for any Solana token by mint address |

## API Routes

| Route | Description |
|-------|-------------|
| `/api/tokens` | Fetches live token prices from Jupiter Price API |
| `/api/bars` | OHLCV candle data via Codex.io (mock fallback) |
| `/api/quote` | Swap quote from Jupiter Quote API |

## Deploy on Vercel

```bash
npm i -g vercel
vercel
```

Set `NEXT_PUBLIC_PRIVY_APP_ID` and `CODEX_API_KEY` in Vercel environment variables.

## Mobile Apps

- [Android](https://play.google.com/store/apps/details?id=xyz.chadwallet.www)
- [iPhone](https://apps.apple.com/us/app/chadwallet/id6757367474)
