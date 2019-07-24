export default class StorageService {
  constructor() {
    this.wallets = `wallets`;
  }

  add(wallet) {
    if (localStorage.getItem(this.wallets)) {
      let wallets = JSON.parse(localStorage.getItem(this.wallets));
      wallets.push(wallet);
      localStorage.setItem(this.wallets, JSON.stringify(wallets));
    } else {
      localStorage.setItem(this.wallets, JSON.stringify([wallet]));
    }
  }

  delete(address) {
    let newWallets = this.getAll().filter(wallet => {
      return wallet.address !== address;
    });
    this.setItem(this.wallets, JSON.stringify(newWallets));
  }

  getByAddress(address) {
    return this.getAll().filter(wallet => {
      return wallet.address === address;
    });
  }

  getAll() {
    return JSON.parse(localStorage.getItem(this.wallets));
  }
}
