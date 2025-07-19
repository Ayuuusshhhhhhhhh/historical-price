const { createClient } = require("redis");

console.log("📦 REDIS_URL from env:", process.env.REDIS_URL); // ← ✅ debug line

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redisClient.on("error", (err) => console.error("❌ Redis error", err));

redisClient.connect().then(() => {
  console.log("✅ Connected to Redis");
});

module.exports = redisClient;
