const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL, // ✅ This is what Render injects
  socket: {
    tls: true, // ✅ Needed for Upstash
    rejectUnauthorized: false, // ✅ Safe for public Upstash
  },
});

redisClient.on("error", (err) => console.error("❌ Redis error", err));
redisClient.connect().then(() => {
  console.log("✅ Connected to Redis");
});

module.exports = redisClient;
