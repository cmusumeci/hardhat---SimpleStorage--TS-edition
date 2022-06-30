import { expect, assert } from "chai"
import type { ContractFactory, Contract } from "ethers"
import { ethers } from "hardhat"
import { describe } from "mocha"

describe("Test SimpleStorage contract", () => {
  let simpleStorageFactory: ContractFactory, simpleStorage: Contract
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  //    it.only("deploys a contract", async () => {
  //      const contractAddress = await simpleStorage.address
  //      expect(contractAddress).to.be.a("string")
  //    })

  it("Should start with favorite number set to 0", async () => {
    const favoriteNumber = await simpleStorage.retrieve()
    const expetedFavoriteNumber = "0"
    assert.equal(favoriteNumber.toString(), expetedFavoriteNumber)
  })

  it("Should set favorite number to 1 by store function", async () => {
    const store = await simpleStorage.store(1)
    const favoriteNumber = await simpleStorage.retrieve()
    const expetedFavoriteNumber = "1"
    assert.equal(favoriteNumber.toString(), expetedFavoriteNumber)
  })

  it("Add person to the list", async () => {
     await simpleStorage.addPeople("Claudio", 32)
    const ageOfPeople =  await simpleStorage.retrievePeople("Claudio")
    assert.equal(ageOfPeople.toString(), "32")
  })
})
