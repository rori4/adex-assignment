import { ethers } from "ethers";
require("dotenv").config();

var provider = new ethers.providers.InfuraProvider(
  "mainnet",
  "5d19d3a2d5f144719420b42bf62b08aa"
);
const abi = [
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
  "function required() public constant returns (uint256)",
  "function dailyLimit() public constant returns (uint256)",
  "function getTransactionCount(bool pending, bool executed) public constant returns (uint256 count)",
  "function transactions(uint256) public constant returns (address destination, uint256 value, bytes data, bool executed)"
  //Those should be correct functions!!
];
const BlockchainService = {
  async getBalance(wallet) {
    try {
      let balance = await ethers.getDefaultProvider().getBalance(wallet);
      let etherString = ethers.utils.formatEther(balance);
      console.log("Balance: " + etherString);
    } catch (error) {
      console.log(error);
    }
  },
  async getWalletStats(address) {
    try {
      const contract = new ethers.Contract(address, abi, provider);
      const owners = await contract.getOwners();
      const required = await contract.required();
      const dailyLimit = await contract.dailyLimit();
      let ownersWithNames = [];
      if (Array.isArray(owners)) {
        owners.forEach(address => {
          ownersWithNames.push({ name: "", address: address });
        });
      }
      return {
        owners: ownersWithNames,
        required: Number(required),
        dailyLimit: ethers.utils.formatEther(dailyLimit)
      };
    } catch (error) {
      return false;
    }
  },
  async getTransactionStats(address) {
    try {
      let transactions = [];
      const contract = new ethers.Contract(address, abi, provider);
      const transactionCount = Number(
        await contract.getTransactionCount(true, true)
      );
      for (let i = 0; i < transactionCount; i++) {
        const transaction = contract.transactions(i);
        transactions.push(transaction);
      }
      return await Promise.all(transactions);
    } catch (error) {
      console.log(error);
    }
  },
  async addEventListeners(address) {
    try {
      const contract = new ethers.Contract(address, abi, provider);
      contract.on("Confirmation", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("Revocation", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("Submission", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("Execution", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("ExecutionFailure", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("Deposit", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("OwnerAddition", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("OwnerRemoval", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
      contract.on("RequirementChange", (oldValue, newValue, event) => {
        console.log("Event:", oldValue, newValue);
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default BlockchainService;
