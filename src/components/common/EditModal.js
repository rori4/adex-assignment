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

export default class EditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
             errors: {}
        }
    }

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      let contract = StorageService.getByAddress(this.props.address);
      this.setState({contract});
      return true
    }
    return false;
  }

  render() {
    const { errors } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={this.props.className}
      >
        <ModalHeader>
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
