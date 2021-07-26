import "hardhat-typechain"
import "@nomiclabs/hardhat-waffle"
import "hardhat-contract-sizer"
import "hardhat-abi-exporter"
import { HardhatUserConfig } from "hardhat/types"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 20000,
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
  }
}

export default config
