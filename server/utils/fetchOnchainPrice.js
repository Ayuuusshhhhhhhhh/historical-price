// server/utils/fetchOnchainPrice.js
require("dotenv").config();

const { ethers } = require("ethers");

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

if (!ALCHEMY_KEY) {
  console.error("❌ ALCHEMY_KEY is missing! Please check your .env file");
  process.exit(1);
} else {
  console.log("✅ Loaded Alchemy Key");
}

const provider = new ethers.AlchemyProvider("mainnet", ALCHEMY_KEY);

// Supported Chainlink feeds (add more if needed)
const FEEDS = {
  bitcoin: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",     // BTC/USD
  ethereum: "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419",    // ETH/USD
  usdc: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",        // USDC/USD
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6", // same
};


const PRICE_FEED_ABI = [
  "function latestAnswer() view returns (int256)",
  "function latestTimestamp() view returns (uint256)"
];

async function fetchOnchainPrice(token) {
  const address = FEEDS[token.toLowerCase()];
  if (!address) {
    throw new Error(`Unsupported token: ${token}`);
  }

  try {
    const priceFeed = new ethers.Contract(address, PRICE_FEED_ABI, provider);
    const price = await priceFeed.latestAnswer();
    const timestamp = await priceFeed.latestTimestamp();

    return {
      price: Number(price) / 1e8, // Convert from 8 decimals
      timestamp: Number(timestamp),
    };
  } catch (err) {
    console.error(`❌ Failed to fetch on-chain price for ${token}:`, err.message);
    throw err;
  }
}

module.exports = fetchOnchainPrice;
