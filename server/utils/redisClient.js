const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL;
console.log("📦 Loaded REDIS_URL:", redisUrl);

if (!redisUrl) {
  console.error("❌ REDIS_URL is missing! Check your Render Environment Variables.");
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
  console.error("❌ Redis connection error:", err);
});

redisClient.connect()
  .then(() => {
    console.log("✅ Successfully connected to Redis");
  })
  .catch((err) => {
    console.error("❌ Redis failed to connect:", err);
    process.exit(1);
  });

module.exports = redisClient;
