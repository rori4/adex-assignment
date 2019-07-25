const STORAGE_KEY = "wallets";
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
  getByAddress(address) {
    StorageService.createStorageIfNotExist();
    return this.getAll().filter(wallet => {
      return wallet.address === address;
    });
  },
  createStorageIfNotExist() {
    if (!localStorage.getItem(STORAGE_KEY))
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },
  getAll() {
    StorageService.createStorageIfNotExist();
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
};

export default StorageService;
