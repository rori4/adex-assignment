import BlockchainService from '../../services/blockchainService';
import StorageService from './../../services/storageService';
const cryptaddress = require('cryptaddress-validator');

async function walletValidator(state) {
	const { name, address } = state;
	const isCryptoAddress = cryptaddress('eth').test(address);
	const isMultisig = isCryptoAddress
		? await BlockchainService.getWalletStats(address)
		: false;
	const exists = isMultisig
		? StorageService.getByAddress(address) &&
		  StorageService.getByAddress(address).length !== 0
		: false;
	let errors = {};
	name === undefined || name === '' || name.length === 0
		? (errors.name = 'Name is required')
		: delete errors.name;
	address === undefined || address === '' || address.length === 0
		? (errors.address = 'Address is required')
		: delete errors.address;
	if (isCryptoAddress && isMultisig && !exists) {
		delete errors.address;
	} else {
		if (!isMultisig)
			errors.address = 'Please provide a valid multisignature wallet address';
		if (!isCryptoAddress)
			errors.address = 'Please provide a valid ethereum address';
		if (exists) errors.address = 'Wallet already exists';
	}

	return errors;
}

export default walletValidator;
