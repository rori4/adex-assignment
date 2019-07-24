import { ethers } from "ethers";

export default class BlockchainService {
  constructor() {
    //the API key must be added to a .env
    this.provider = new ethers.providers.InfuraProvider(
      "mainnet",
      "5d19d3a2d5f144719420b42bf62b08aa"
    );
  }

  get(wallet) {
    provider.getBalance(wallet).then(balance => {
      // balance is a BigNumber (in wei); format is as a sting (in ether)
      let etherString = ethers.utils.formatEther(balance);
      console.log("Balance: " + etherString);
    });
  }
}
