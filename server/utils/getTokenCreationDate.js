const { Alchemy, Network } = require("alchemy-sdk");

const networkMap = {
  ethereum: Network.ETH_MAINNET,
  polygon: Network.MATIC_MAINNET,
};

async function getTokenCreationDate(token, network) {
  const alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_KEY,
    network: networkMap[network],
  });

  const transfers = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    contractAddresses: [token],
    category: ["erc20"],
    order: "asc",
    maxCount: 1,
  });

  if (transfers.transfers.length === 0) {
    throw new Error("Token has no known transfer history");
  }

  const firstTransfer = transfers.transfers[0];
  const block = await alchemy.core.getBlock(firstTransfer.blockNum); 
  const creationDate = new Date(block.timestamp * 1000);

  return creationDate;
}

module.exports = getTokenCreationDate;
