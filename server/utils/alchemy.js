const { Alchemy, Network } = require("alchemy-sdk");

const getAlchemyInstance = (networkName) => {
  const networkMap = {
    ethereum: Network.ETH_MAINNET,
    polygon: Network.MATIC_MAINNET,
  };

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: networkMap[networkName],
  };

  return new Alchemy(settings);
};

module.exports = getAlchemyInstance;
