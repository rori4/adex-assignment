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

export default class CustomModal extends Component {
  static storageService = new StorageService();
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

  handleSubmit = () => {
    this.checkValidity();
    if (Object.keys(this.state.errors).length === 0) {
      this.saveToLocalStorage();
      this.clearState();
      this.props.onClose();
      this.props.updateWallets();
    } else {
      //TODO: Toaster
    }
  };

  checkValidity = () => {
    let errors = walletValidator(this.state);
    this.setState({ errors });
  };

  clearState = () => {
      this.setState(this.initialState);
  };

  saveToLocalStorage = () => {
    const { name, address } = this.state;
    CustomModal.storageService.add({ name, address });
  };

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
          <Button color="secondary" onClick={this.props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
