require("dotenv").config(); // Make sure this is at the VERY top

const { createClient } = require("redis");

console.log("📦 Loaded REDIS_URL from .env or Render:", process.env.REDIS_URL);

if (!process.env.REDIS_URL) {
  console.error("❌ REDIS_URL is undefined. Check Render environment settings.");
  process.exit(1);
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

redisClient.connect()
  .then(() => {
    console.log("✅ Connected to Redis successfully");
  })
  .catch((err) => {
    console.error("❌ Redis failed to connect:", err);
    process.exit(1);
  });

module.exports = redisClient;
