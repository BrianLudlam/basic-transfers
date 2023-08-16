require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [privateKey],
      gasPrice: 50000000000, // default is 'auto' which breaks chains without the london hardfork
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey],
      gasPrice: 50000000000, // default is 'auto' which breaks chains without the london hardfork
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/3e6737949c4d45f7911f963260e9c23a",
      accounts: [privateKey],
      gasPrice: 50000000000, // default is 'auto' which breaks chains without the london hardfork
    },
    goerli: {
      url: "https://goerli.infura.io/v3/3e6737949c4d45f7911f963260e9c23a",
      accounts: [privateKey],
      gasPrice: 50000000000, // default is 'auto' which breaks chains without the london hardfork
    },
    linea: {
      url: "https://linea-goerli.infura.io/v3/ca3e2382d1364442b37c22c1a48a7d46",
      accounts: [privateKey],
      gasPrice: 50000000000, // default is 'auto' which breaks chains without the london hardfork
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/3e6737949c4d45f7911f963260e9c23a",
      accounts: [privateKey],
      gasPrice: 220000000000, // default is 'auto' which breaks chains without the london hardfork
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
