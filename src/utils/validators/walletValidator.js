import BlockchainService from "../../services/blockchainService";
import StorageService from "./../../services/storageService";
const cryptaddress = require("cryptaddress-validator");

async function walletValidator(state) {
  const { name, address } = state;
  let stats = await BlockchainService.getWalletStats(address);
  let errors = {};
  name === undefined || name === "" || name.length === 0
    ? (errors.name = "Name is required")
    : delete errors.name;
  StorageService.getByAddress(address).length !== 0
    ? (errors.address = "Wallet already exists")
    : delete errors.address;
  stats
    ? delete errors.address
    : (errors.address = "Please provide a valid multisignature wallet address");
  return errors;
}

export default walletValidator;
