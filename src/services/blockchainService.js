import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { shorten } from './../utils/stringUtils';

var provider = new ethers.providers.InfuraProvider(
	'mainnet',
	'5d19d3a2d5f144719420b42bf62b08aa'
);
const abi = [
	'event Confirmation(address indexed sender, uint indexed transactionId)',
	'event Revocation(address indexed sender, uint indexed transactionId)',
	'event Submission(uint indexed transactionId)',
	'event Execution(uint indexed transactionId)',
	'event ExecutionFailure(uint indexed transactionId)',
	'event Deposit(address indexed sender, uint value)',
	'event OwnerAddition(address indexed owner)',
	'event OwnerRemoval(address indexed owner)',
	'event RequirementChange(uint required)',
	'function getOwners() public constant returns (address[])',
	'function required() public constant returns (uint256)',
	'function dailyLimit() public constant returns (uint256)',
	'function getTransactionCount(bool pending, bool executed) public constant returns (uint256 count)',
	'function transactions(uint256) public constant returns (address destination, uint256 value, bytes data, bool executed)',
	//Those should be correct functions!!
];
const BlockchainService = {
	async getBalance(wallet) {
		try {
			let balance = await provider.getBalance(wallet);
			let etherString = ethers.utils.formatEther(balance);
			return etherString;
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
					ownersWithNames.push({
						name: '',
						address: address,
					});
				});
			}
			return {
				owners: ownersWithNames,
				required: Number(required),
				dailyLimit: ethers.utils.formatEther(dailyLimit),
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
	async addEventListeners(address, callback) {
		try {
			const contract = new ethers.Contract(address, abi, provider);
			contract.on('Confirmation', (oldValue, newValue, event) => {
				toast.success(
					`${event.event} has been made by ${shorten(
						event.args.sender
					)} with ID:${Number(event.args.transactionId) + 1}`
				);
				callback();
			});
			contract.on('Revocation', (oldValue, newValue, event) => {
				console.log('Event:', event);
			});
			contract.on('Submission', (oldValue, newValue, event) => {
				console.log('New transaction submitted');
			});
			contract.on('Execution', (oldValue, newValue, event) => {
				toast.info('New transaction submitted');
			});
			contract.on('ExecutionFailure', (oldValue, newValue, event) => {
				toast.error('There was an execution failure');
			});
			contract.on('Deposit', (oldValue, newValue, event) => {
				toast.success(
					`${event.event} has been made by ${shorten(
						event.args.sender
					)} to ${shorten(event.address)} for ${ethers.utils.formatEther(
						event.args.value
					)} ETH`
				);
				callback();
			});
			contract.on('OwnerAddition', (oldValue, newValue, event) => {
				toast.info('New owner added to the wallet');
			});
			contract.on('OwnerRemoval', (oldValue, newValue, event) => {
				toast.info('An owner was removed from the wallet');
			});
			contract.on('RequirementChange', (oldValue, newValue, event) => {
				toast.info('Wallet requirements have changed');
			});
		} catch (error) {
			console.log(error);
		}
	},
	async removeEventListeners(address) {
		try {
			const contract = new ethers.Contract(address, abi, provider);
			await contract.removeAllListeners();
		} catch (error) {
			console.log(error);
		}
	},
};

export default BlockchainService;
