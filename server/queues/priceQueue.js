// server/queues/priceQueue.js
const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null,
});

const priceQueue = new Queue('price-fetch-queue', { connection });

module.exports = priceQueue;
