// server/interpolate.js
function interpolate(ts_q, ts1, price1, ts2, price2) {
  const ratio = (ts_q - ts1) / (ts2 - ts1);
  return price1 + (price2 - price1) * ratio;
}

module.exports = interpolate;
