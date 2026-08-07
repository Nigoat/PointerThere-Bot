# PointerThere Discord Bot

Official Discord Bot for the **PointerThere** Geometry Dash Demon List platform.

Licensed under the **GNU General Public License v3.0**.

---

## Features

- 🎫 **Ticket System**: Category dropdown, ticket creation with private permissions, claim ticket, and auto-delete close timer.
- 🔗 **User Verification**: Link Discord accounts with PointerThere user profiles and auto-assign Verified role.
- 🎉 **Welcome Messages**: Custom welcome embeds sent to new members joining the server.
- 📊 **Slash Commands**:
  - `/demon <query>` — Search demon levels by rank or name.
  - `/rankings` — View top 10 players on the global leaderboard.
  - `/stats <username>` — View user scores and approved record count.
  - `/verify` — Verification flow to claim the Verified role.
  - `/ticket` — Deploy ticket panel (Administrator only).

---

## Setup & Running

### Prerequisites

- Node.js 18+
- Discord Bot Token & Application Client ID ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

```bash
cd bot
cp .env.example .env
# Edit .env and enter your DISCORD_TOKEN, CLIENT_ID, GUILD_ID, etc.

npm install
npm start
```
