import React, { Component } from 'react';
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
} from 'reactstrap';
import StorageService from '../../services/storageService';
import walletValidator from '../../utils/validators/walletValidator';
import BlockchainService from '../../services/blockchainService';

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      address: '',
      errors: {},
      disableSubmit: false,
    };
    this.state = this.initialState;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async () => {
    this.setState({
      disableSubmit: true,
    });
    const errors = await walletValidator(this.state);
    this.setState({ errors }, async () => {
      if (Object.keys(this.state.errors).length === 0) {
        this.props.onClose();
        await this.saveToLocalStorage();
        this.clearState();
        this.props.updateWallets();
      }
    });
    this.setState({
      disableSubmit: false,
    });
  };

  saveToLocalStorage = async () => {
    try {
      const { name, address } = this.state;
      const {
        owners,
        required,
        dailyLimit,
      } = await BlockchainService.getWalletStats(address);
      StorageService.add({
        name,
        address,
        owners,
        required,
        dailyLimit,
      });
      BlockchainService.addEventListeners(address);
    } catch (error) {
      console.log(error);
    }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  checkValidity = async () => {
    const errors = walletValidator(this.state);
    this.setState({ errors });
  };

  clearState = () => {
    this.setState(this.initialState);
  };

  closeModal = () => {
    this.clearState();
    this.props.onClose();
  };

  render() {
    const { errors, disableSubmit } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={this.props.className}
        onKeyPress={this.handleKeyPress}
        autoFocus={false}
      >
        <ModalHeader>Add Multisignature Wallet Contract</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='name'>Wallet Name</Label>
              <Input
                autoFocus
                invalid={!!errors.name}
                type='text'
                name='name'
                value={this.state.name}
                id='name'
                placeholder='Give the wallet a name'
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for='exampleEmail'>Address</Label>
              <Input
                invalid={!!errors.address}
                type='text'
                name='address'
                value={this.state.address}
                id='address'
                placeholder='Enter mutlisignature wallet address here...'
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.address}</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='success'
            onClick={this.handleSubmit}
            disabled={disableSubmit}
          >
            {disableSubmit ? 'Saving...' : 'Save'}
          </Button>
          <Button color='secondary' onClick={this.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
