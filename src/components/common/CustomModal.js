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
  Input
} from "reactstrap";
import StorageService from "../../services/storageService";

export default class CustomModal extends Component {
  static storageService = new StorageService();
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveToLocalStorage = () => {
    const { name, address } = this.state;
    CustomModal.storageService.add({ name, address });
  };

  render() {
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
                type="text"
                name="name"
                value={this.state.name}
                id="name"
                placeholder="Give the wallet a name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Address</Label>
              <Input
                type="text"
                name="address"
                value={this.state.address}
                id="address"
                placeholder="Enter mutlisignature wallet address here..."
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.saveToLocalStorage}>
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
