console.log("📦 Using Redis URL:", process.env.REDIS_URL);

const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL, // Make sure this is from Render
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
