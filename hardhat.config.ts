import * as dotenv from "dotenv"

import { HardhatUserConfig, task } from "hardhat/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"

dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_RINKEBY_KEY = process.env.PRIVATE_RINKEBY_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const PRIVATE_KEY_LOCAL = process.env.PRIVATE_KEY_LOCAL
const LOCAL_RPC_URL = process.env.LOCAL_RPC_URL

const config: HardhatUserConfig = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_RINKEBY_KEY!],
      chainId: 4,
    },
    localhost: {
      accounts: [PRIVATE_KEY_LOCAL!],
      url: LOCAL_RPC_URL,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

export default config
