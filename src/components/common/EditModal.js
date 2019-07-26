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
  FormFeedback,
  FormText
} from "reactstrap";
import StorageService from "../../services/storageService";

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      owners: [],
      name: "",
      errors: {},
      disableSubmit: false
    };
    this.state = this.initialState;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.name !== prevProps.name ||
      this.props.owners !== prevProps.owners
    ) {
      this.setState({
        name: this.props.name,
        owners: this.props.owners
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    const walletAddress = this.props.address;
    const { owners, name } = this.state;
    StorageService.updateWalletData(walletAddress, { owners, name });
    this.closeModal();
    this.props.updateWallets();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleOwnerChange = (e, index) => {
    const owners = this.state.owners;
    owners[index][e.target.name] = e.target.value;
    this.setState({
      owners
    });
  };

  checkValidity = async () => {
    console.log("TODO: NEED TO CHECK IF FIRST NAME NOT EMPTY");
  };

  clearState = () => {
    this.setState(this.initialState);
  };

  closeModal = () => {
    this.clearState();
    this.props.onClose();
  };

  render() {
    const { errors, disableSubmit, name, address, owners } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={this.props.className}
        onKeyPress={this.handleKeyPress}
        autoFocus={false}
      >
        <ModalHeader>Edit Multisignature Wallet</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Wallet Name</Label>
              <Input
                autoFocus={true}
                invalid={errors.name ? true : false}
                type="text"
                name="name"
                value={name}
                id="name"
                placeholder="Give the wallet a name"
                onChange={this.handleChange}
              />
              <FormText color="muted">Wallet Address: {address}</FormText>
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            {owners && owners.length > 0
              ? owners.map((value, index) => (
                  <FormGroup key={index}>
                    <Label for="exampleEmail">Owner {index + 1} Alias</Label>
                    <Input
                      invalid={errors.owners ? true : false}
                      type="text"
                      name="name"
                      index={index}
                      value={this.state.owners[index].name}
                      id="ownerName"
                      placeholder="Enter mutlisignature wallet address here..."
                      onChange={e => this.handleOwnerChange(e, index)}
                    />
                    <FormText color="muted">
                      Owner Address: {value.address}
                    </FormText>
                    <FormFeedback>{errors.address}</FormFeedback>
                  </FormGroup>
                ))
              : null}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={this.handleSubmit}
            disabled={disableSubmit}
          >
            {disableSubmit ? "Saving..." : "Save"}
          </Button>
          <Button color="secondary" onClick={this.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
