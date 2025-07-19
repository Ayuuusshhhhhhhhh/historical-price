const { createClient } = require("redis");
require("dotenv").config();

const redisUrl = process.env.REDIS_URL;
console.log("📦 Loaded REDIS_URL:", redisUrl);

if (!redisUrl) {
  console.error("❌ REDIS_URL is missing or undefined");
  process.exit(1);
}

const redisClient = createClient({
  url: redisUrl,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redisClient.connect()
  .then(() => console.log("✅ Connected to Redis successfully"))
  .catch((err) => {
    console.error("❌ Failed Redis connection:", err);
    process.exit(1);
  });

module.exports = redisClient;
