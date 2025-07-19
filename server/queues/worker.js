// server/queues/worker.js
console.log(process.env.ALCHEMY_API_KEY);
require('dotenv').config();
const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const redisClient = require('../utils/redisClient');
const fetchOnchainPrice = require('../utils/fetchOnchainPrice');

const connection = new IORedis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  'price-fetch-queue',
  async job => {
    const { token, date } = job.data;

    const cacheKey = `${token}-${date}`;

    try {
      const { price, timestamp } = await fetchOnchainPrice(token);

      if (price) {
        await redisClient.set(cacheKey, JSON.stringify({ price, timestamp }), { EX: 3600 });
        console.log(`✅ Cached on-chain price for ${cacheKey}: $${price} at ${new Date(timestamp * 1000).toISOString()}`);
      } else {
        console.warn(`⚠️ Price not found for ${cacheKey}`);
      }
    } catch (error) {
      console.error(`❌ Failed to fetch on-chain price for ${cacheKey}`, error.message);
    }
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`🎉 Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`🔥 Job failed: ${job.id}`, err);
});
