import { ethers } from "ethers";
require("dotenv").config();

export default class BlockchainService {
  constructor() {
    //the API key must be added to a .env
    this.provider = new ethers.providers.InfuraProvider(
      "mainnet",
      "5d19d3a2d5f144719420b42bf62b08aa"
    );
    this.abi = [
      "event Confirmation(address indexed sender, uint indexed transactionId)",
      "event Revocation(address indexed sender, uint indexed transactionId)",
      "event Submission(uint indexed transactionId)",
      "event Execution(uint indexed transactionId)",
      "event ExecutionFailure(uint indexed transactionId)",
      "event Deposit(address indexed sender, uint value)",
      "event OwnerAddition(address indexed owner)",
      "event OwnerRemoval(address indexed owner)",
      "event RequirementChange(uint required)",
      "function getOwners() public constant returns (address[])",
      //Those should be correct functions!!
    ];
  }

  async getBalance(wallet) {
    try {
      let balance = await ethers.getDefaultProvider().getBalance(wallet);
      let etherString = ethers.utils.formatEther(balance);
      console.log("Balance: " + etherString);
    } catch (error) {
      console.log(error);
    }
  }

  async getWalletStats(address) {
    try {
      let contract = new ethers.Contract(address, this.abi, this.provider);
      let owners = await contract.getOwners();
      console.log(owners);
    } catch (error) {
      console.log(error);
    }
  }
}
