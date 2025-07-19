require('dotenv').config();
console.log("🔍 ALCHEMY_URL is:", process.env.ALCHEMY_URL);

const { fetchPriceFromAlchemy } = require('../server/utils/fetchPrice');

(async () => {
  try {
    const price = await fetchPriceFromAlchemy("eth", "2024-12-30");
    console.log("✅ On-chain ETH price:", price);
  } catch (err) {
    console.error("❌ Failed to fetch price:", err.message);
  }
})();
