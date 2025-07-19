const express = require("express");
const redisClient = require("../utils/redisClient");

const router = express.Router();

router.get("/", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  const keyPrefix = token.toLowerCase() + "-";
  try {
    const keys = await redisClient.keys(`${keyPrefix}*`);
    const dates = keys.map(k => k.replace(`${keyPrefix}`, ""));

    res.json({
      token,
      daysCached: dates.length,
      datesCached: dates
    });
  } catch (err) {
    console.error("Progress error:", err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

module.exports = router;
