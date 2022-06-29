import { ethers, network, run } from "hardhat"
import "dotenv/config"
async function main() {
  try {
    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    )
    const simpleStorage = await simpleStorageFactory.deploy()
    console.log("deploying contract....")
    await simpleStorage.deployed()
    console.log(`deployed contract at: ${simpleStorage.address}`)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
      console.log("wait for block txes...")
      await simpleStorage.deployTransaction.wait(6)
      await verify(simpleStorage.address, [])
    }
     const currentValue = await simpleStorage.retrieve()
     console.log(`Current Value is: ${currentValue}`)

     // Update the current value
     const transactionResponse = await simpleStorage.store(7)
     await transactionResponse.wait(1)
     const updatedValue = await simpleStorage.retrieve()
     console.log(`Updated Value is: ${updatedValue}`)
  } catch (error) {
    throw error
  }
}

async function verify(contractAddress: string, args: any) {
  console.log("Verifying contract....")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      throw error
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
