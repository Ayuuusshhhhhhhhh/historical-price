const ethers = require('ethers'); 
require('dotenv').config();

const ALCHEMY_URL = process.env.ALCHEMY_URL;

const POOL_ADDRESS = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'; // example: USDC/ETH

const IUniswapV3PoolABI = [
  "function slot0() external view returns (uint160 sqrtPriceX96,int24 tick,uint16 observationIndex,uint16 observationCardinality,uint16 observationCardinalityNext,uint8 feeProtocol,bool unlocked)"
];

async function getBlockAtTimestamp(provider, timestamp) {
  let latestBlock = await provider.getBlock("latest");
  let low = 0;
  let high = latestBlock.number;
  let closestBlock = null;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    const block = await provider.getBlock(mid);
    if (!block) break;

    if (block.timestamp < timestamp) {
      low = mid + 1;
      closestBlock = block;
    } else {
      high = mid - 1;
    }
  }
  return closestBlock?.number;
}

function tickToPrice(tick) {
  const sqrtRatio = Math.pow(1.0001, tick);
  return 1 / sqrtRatio;
}

async function fetchPriceFromAlchemy(token, date) {
  const ALCHEMY_URL = process.env.ALCHEMY_URL;
  if (!ALCHEMY_URL) throw new Error("ALCHEMY_URL is not set");

  const provider = new ethers.JsonRpcProvider(ALCHEMY_URL);

  const timestamp = new Date(date).getTime() / 1000; 
  const block = await provider.getBlockNumber();

  const blockInfo = await provider.getBlock(block);

  const blockTimestamp = blockInfo.timestamp;

  const signerAddress = '0x0000000000000000000000000000000000000000'; 
  const balance = await provider.getBalance(signerAddress);

  return Number(ethers.formatEther(balance));
}


module.exports = { fetchPriceFromAlchemy };
