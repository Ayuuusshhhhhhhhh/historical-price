require('dotenv').config();

const express = require('express');
const cors = require('cors');
const redisClient = require('./utils/redisClient');
const { getInterpolatedPrice } = require('./interpolation');

// ✅ Initialize express FIRST
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
const scheduleRoutes = require('./routes/schedule');
//const fullHistoryRoute = require('./routes/scheduleFullHistory');

const progressRoute = require('./routes/progress');
app.use('/progress', progressRoute);

app.use('/schedule', scheduleRoutes);
//app.use('/schedule-full-history', fullHistoryRoute);

// ✅ /interpolate route
app.post('/interpolate', async (req, res) => {
  let { token, timestamp } = req.body;

  console.log("Received interpolate request:", req.body);

  if (!token || !timestamp) {
    return res.status(400).json({ error: "Missing token or timestamp" });
  }

  token = token.toLowerCase();
  const dateOnly = timestamp.split("T")[0];
  const redisKey = `${token}-${dateOnly}`;

  try {
    const cached = await redisClient.get(redisKey);
    if (!cached) return res.status(404).json({ error: "Token not found in cache" });

    const parsed = JSON.parse(cached);
    res.json({ price: parsed.price });
  } catch (err) {
    console.error("Interpolation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ /price route
app.get('/price', async (req, res) => {
  const { token, date } = req.query;

  if (!token || !date) {
    return res.status(400).json({ error: 'Token and date are required' });
  }

  const key = `${token.toLowerCase()}-${date}`;
  try {
    const result = await redisClient.get(key);
    if (!result) return res.status(404).json({ error: 'Price not found in cache' });

    res.json({ token, date, price: JSON.parse(result) });
  } catch (err) {
    console.error("Cache fetch error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
