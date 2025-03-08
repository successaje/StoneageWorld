require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    'a8-testnet': {
      url: process.env.RPC_URL,  
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    }
  },
  etherscan: {
    apiKey: "NO_API_KEY", // Use API key here
    customChains: [
      {
        network: "a8-testnet",
        chainId: 28122024,  
        urls: {
          apiURL: "https://scanv2-testnet.ancient8.gg/api",  
          browserURL: "https://scanv2-testnet.ancient8.gg/",  
        },
      },
    ],
  },
  defaultNetwork: 'a8-testnet',
};
