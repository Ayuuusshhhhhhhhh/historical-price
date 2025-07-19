# 🪙 Historical Token Price Oracle

A full-stack Web3 application that allows users to:

- 🔍 Fetch historical prices of ERC-20 tokens
- 🧠 Interpolate prices for missing timestamps
- 🔁 Schedule and cache token prices daily using Chainlink oracles
- ⚡ Fast price lookup using Redis
- 🖥️ Beautiful dark-mode frontend in Next.js

> Tech used: **Next.js**, **Node.js**, **Redis**, **Chainlink**, **BullMQ**, **Alchemy**

---

## 🧠 How It Works

User inputs token + date on frontend
↓
Backend checks Redis for cached price
↓
If not found → fetch from Chainlink or interpolate
↓
Price stored in Redis with TTL
↓
User sees final price (source: cache | on-chain | interpolated)

---

## ✨ Features

- 🔎 **Interpolated Price Lookup**
- 🧊 **Redis caching** for 5-minute performance boost
- 🔄 **Job queue (BullMQ)** to fetch historical prices
- ⏱️ **Chainlink price feed** via Alchemy API
- 🎨 **Dark mode toggle** + responsive UI (Next.js + Tailwind)

---

## 🧪 Try Locally (Dev Setup)

### ✅ Prerequisites

- Node.js ≥ 18
- Redis installed locally
- Alchemy API Key (Ethereum mainnet)
- Git

---

### 📦 Install

# clone the repo
git clone https://github.com/YOUR_USERNAME/historical-price.git
cd historical-price

# install frontend & backend
cd client && npm install
cd ../server && npm install

🔐 Setup Environment
In server/, create a file called .env:

env
REDIS_URL=redis://localhost:6379
ALCHEMY_KEY=your_alchemy_key_here
PORT=4000
Or copy from .env.example.

▶️ Run Locally
Open 3 terminals:

Terminal 1 – Redis

redis-server
Terminal 2 – Backend

cd server
node index.js
Terminal 3 – Worker

cd server
node queues/worker.js
Terminal 4 – Frontend

cd client
npm run dev
Visit 👉 http://localhost:3000

🧪 Test Case (Example Input)
Field	Value
Token Address :	btc 
Timestamp :	2025-07-01T10:00
Network :	ethereum

✅ Works with all buttons.


🧠 Concepts Demonstrated
Redis caching

RESTful API (GET /price, POST /interpolate, /schedule)

Queue workers with BullMQ

Alchemy + Chainlink integration

Interpolation logic with fallback

Zustand state management

Tailwind UI + dark mode

🔒 Environment Variables
Key	Description
REDIS_URL	Redis connection string
ALCHEMY_KEY	Alchemy API key for Ethereum mainnet
PORT	Server port (default: 4000)
