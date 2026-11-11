# Cloudflare Worker Global Backend ($0/month)

Provides live **WebSocket (`msgpack-lite`)** persistence across all visitors for:
- **Live Whispers** (up to 30 visitor flame messages stored in Durable Object SQLite)
- **Daily Circuit Top 10 Leaderboard** (resets daily UTC)
- **Global Cookie Stand & Altar Sacrifice Counters**

## Deploy Steps

1. Install worker dependencies and log in to Cloudflare (free account):
   ```powershell
   cd cloudflare-worker
   npm install
   npx wrangler login
   ```
2. Deploy to Cloudflare Edge:
   ```powershell
   npx wrangler deploy
   ```
   Wrangler outputs a URL like `https://vansh-portfolio-hub.<your-subdomain>.workers.dev`.
3. Convert `https://` to `wss://`:
   - **Locally:** set `VITE_SERVER_URL=wss://vansh-portfolio-hub.<your-subdomain>.workers.dev` in root `.env`.
   - **Production (GitHub Pages):** add a Repository Variable named `VITE_SERVER_URL` in GitHub Repo Settings → **Secrets and variables → Actions → Variables** so `.github/workflows/deploy.yml` injects it automatically on build.
