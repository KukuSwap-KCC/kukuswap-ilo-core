import "hardhat-typechain"
import "@nomiclabs/hardhat-waffle"
import "hardhat-contract-sizer"
import "hardhat-abi-exporter"
import "hardhat-gas-reporter"
import { HardhatUserConfig } from "hardhat/types"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: "https://rpc-mainnet.kcc.network"
      },
      gas: 12450000,
      gasPrice: 0
    }
  },
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  gasReporter: {
    coinmarketcap: '',
    currency: "ETH",
  },
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 100000,
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
}

export default config
