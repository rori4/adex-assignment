const STORAGE_KEY = 'wallets';
const StorageService = {
	add(wallet) {
		StorageService.createStorageIfNotExist();
		if (localStorage.getItem(STORAGE_KEY)) {
			let wallets = JSON.parse(localStorage.getItem(STORAGE_KEY));
			wallets.push(wallet);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets));
		} else {
			localStorage.setItem(STORAGE_KEY, JSON.stringify([wallet]));
		}
	},
	delete(address) {
		let newWallets = StorageService.getAll().filter(wallet => {
			return wallet.address !== address;
		});
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newWallets));
	},
	updateWalletData(address, newData) {
		let allData = StorageService.getAll();
		allData.forEach((element, index) => {
			if (element.address === address) {
				allData[index].name = newData.name;
				newData.owners.forEach(el => {
					pushToArray(allData[index].owners, el);
				});
			}
		});
		localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
	},
	getByAddress(address) {
		return this.getAll().find(wallet => {
			return wallet.address === address;
		});
	},
	createStorageIfNotExist() {
		if (!localStorage.getItem(STORAGE_KEY))
			localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
	},
	getAll() {
		if (!localStorage.getItem(STORAGE_KEY)) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
		}
		return JSON.parse(localStorage.getItem(STORAGE_KEY));
	},
};

function pushToArray(arr, obj) {
	const index = arr.findIndex(e => e.address === obj.address);
	if (index === -1) {
		arr.push(obj);
	} else {
		arr[index] = obj;
	}
}

export default StorageService;
