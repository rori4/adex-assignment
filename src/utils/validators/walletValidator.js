const cryptaddress = require('cryptaddress-validator');

function walletValidator(state) {
  const { name, address } = state;
  let errors = {};
  name === undefined || name === "" || name.length === 0
    ? (errors.name = "Name is required")
    : delete errors.name;
  address === undefined || address === "" || address.length === 0
    ? (errors.address = "Address is required")
    : delete errors.address;
  cryptaddress('eth').test(address)
    ? delete errors.address
    : (errors.address = "Please provide a valid address")
  return errors;
}

export default walletValidator;
