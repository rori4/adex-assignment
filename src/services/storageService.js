const STORAGE_KEY = "wallets";
const StorageService = {
  add(wallet) {
    if (localStorage.getItem(STORAGE_KEY)) {
      let wallets = JSON.parse(localStorage.getItem(STORAGE_KEY));
      wallets.push(wallet);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallets));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([wallet]));
    }
  },
  delete(address) {
    let newWallets = this.getAll().filter(wallet => {
      return wallet.address !== address;
    });
    this.setItem(STORAGE_KEY, JSON.stringify(newWallets));
  },
  getByAddress(address) {
    return this.getAll().filter(wallet => {
      return wallet.address === address;
    });
  },
  getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
};

export default StorageService;
