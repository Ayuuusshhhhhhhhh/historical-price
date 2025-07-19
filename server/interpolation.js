const interpolate = require('./interpolate');

function getInterpolatedPrice(token, timestampStr) {
  const historicalData = {
    BTC: [
      { timestamp: "2025-07-01T08:00:00", price: 28000 },
      { timestamp: "2025-07-01T09:00:00", price: 30000 },
      { timestamp: "2025-07-01T11:00:00", price: 32000 },
      { timestamp: "2025-07-01T16:00:00", price: 35000 },
    ],
    ETH: [
      { timestamp: "2025-07-01T09:00:00", price: 1800 },
      { timestamp: "2025-07-01T11:00:00", price: 2000 },
    ],
  };

  const data = historicalData[token];
  if (!data) throw new Error("Token not found");

  const ts = new Date(timestampStr).getTime();

  for (let i = 0; i < data.length - 1; i++) {
    const ts1 = new Date(data[i].timestamp).getTime();
    const ts2 = new Date(data[i + 1].timestamp).getTime();
    if (ts >= ts1 && ts <= ts2) {
      return interpolate(ts, ts1, data[i].price, ts2, data[i + 1].price).toFixed(2);
    }
  }

  throw new Error("Timestamp out of range");
}

module.exports = { getInterpolatedPrice };
