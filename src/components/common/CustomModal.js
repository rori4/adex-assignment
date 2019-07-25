import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import StorageService from "../../services/storageService";
import walletValidator from "../../utils/validators/walletValidator";
import BlockchainService from "./../../services/blockchainService";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      address: "",
      errors: {}
    };
    this.state = this.initialState;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    let errors = await walletValidator(this.state);
    this.setState({ errors }, async ()=>{
      if (Object.keys(this.state.errors).length === 0) {
        this.props.onClose();
        await this.saveToLocalStorage();
        this.clearState();
        this.props.updateWallets();
      } else {
        //TODO: Toaster
      }
    });
  };

  checkValidity = async () => {
    let errors = walletValidator(this.state);
    this.setState({ errors });
  };

  clearState = () => {
    this.setState(this.initialState);
  };

  saveToLocalStorage = async () => {
    try {
      const { name, address } = this.state;
      const {
        owners,
        required,
        dailyLimit
      } = await BlockchainService.getWalletStats(address);
      StorageService.add({ name, address, owners, required, dailyLimit });
    } catch (error) {
      console.log(error);
    }
  };

  closeModal = () => {
    this.clearState();
    this.props.onClose();
  }

  render() {
    const { errors } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>
          Add a multi-signature wallet contract to the list
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Wallet Name</Label>
              <Input
                invalid={errors.name ? true : false}
                type="text"
                name="name"
                value={this.state.name}
                id="name"
                placeholder="Give the wallet a name"
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Address</Label>
              <Input
                invalid={errors.address ? true : false}
                type="text"
                name="address"
                value={this.state.address}
                id="address"
                placeholder="Enter mutlisignature wallet address here..."
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.address}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={this.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
