import { ethers } from "ethers";
require('dotenv').config()

export default class BlockchainService {
  constructor() {
    //the API key must be added to a .env
    this.provider = new ethers.providers.InfuraProvider(
      "mainnet",
      process.env.INFURA_PROJECT_ID
    );
  }

  get(wallet) {
    this.provider.getBalance(wallet).then(balance => {
      // balance is a BigNumber (in wei); format is as a sting (in ether)
      let etherString = ethers.utils.formatEther(balance);
      console.log("Balance: " + etherString);
    });
  }
}
