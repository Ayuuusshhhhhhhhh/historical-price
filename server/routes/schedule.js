const express = require('express');
const priceQueue = require('../queues/priceQueue');

const redisClient = require('../utils/redisClient'); // ✅ Add this if missing

const router = express.Router();

router.post('/', async (req, res) => {
  const { token, date } = req.body;

  if (!token || !date) {
    return res.status(400).json({ error: 'Missing token or date' });
  }

  try {
    await priceQueue.add('fetch-price', { token, date }); 
    res.json({ message: '✅ Price fetch scheduled' });
  } catch (err) {
    console.error('❌ Failed to schedule price fetch', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
