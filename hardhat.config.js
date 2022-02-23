require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
const privateKey =
  fs.readFileSync('.secret').toString().trim() || '01234567890123456789';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/efdee49078b0485e844c8812d5f9c081',
      //url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey],
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
