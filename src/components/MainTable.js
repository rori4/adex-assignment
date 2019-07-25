import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Badge
} from "reactstrap";
import { Colxx } from "./common/CustomBootstrap";
import {
  faPlusSquare,
  faEdit,
  faTrash,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "./common/CustomModal";
import EditModal from "./common/EditModal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shorten, badgeColorSwitcher } from "./../utils/stringUtils";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert-react";
import StorageService from "../services/storageService";

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      editModal: false,
      deleteAlert: false,
      selectedContract: false,
      selectedContractDetails: {},
      wallets: []
    };
  }

  componentDidMount() {
    this.updateWallets();
  }

  updateWallets = () => {
    const wallets = StorageService.getAll();
    this.setState({ wallets });
  };

  toggleAdd = () => {
    this.setState(prevState => ({
      addModal: !prevState.addModal
    }));
  };

  toggleEdit = address => {
    const selectedContractDetails = address
      ? StorageService.getByAddress(address)
      : {};
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      selectedContract: address ? address : false,
      selectedContractDetails
    }));
  };

  handleDeleteConfirm = () => {
    StorageService.delete(this.state.selectedContract);
    this.updateWallets();
    this.setState({ deleteAlert: false, selectedContract: false });
  };

  render() {
    const { wallets } = this.state;
    const { name, owners, address } = this.state.selectedContractDetails;
    return (
      <Fragment>
        <Row className="mb-5">
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Button
                  className="mb-2"
                  color="success"
                  onClick={this.toggleAdd}
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Contract
                </Button>
                <CardTitle className="h3">
                  Multi Signature Wallet Contracts
                </CardTitle>
                {wallets && wallets.length !== 0 ? (
                  <CardSubtitle className="text-muted h6 mb-2">
                    HINT: You can copy addresses by clicking on them
                  </CardSubtitle>
                ) : null}
                <Table hover bordered>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contract</th>
                      <th>Owners</th>
                      <th>Daily Limit</th>
                      <th>Confirms</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallets
                      ? wallets.map((value, index) => (
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>
                              <CopyToClipboard
                                className="pointer"
                                text={value.address}
                                onCopy={() => {
                                  toast.info(
                                    `${shorten(
                                      value.address
                                    )} has been copied to clipboard`,
                                    {
                                      position: toast.POSITION.BOTTOM_CENTER
                                    }
                                  );
                                }}
                              >
                                <Badge color="secondary">
                                  {shorten(value.address)}
                                </Badge>
                              </CopyToClipboard>
                            </td>
                            <td>
                              {value.owners
                                ? value.owners.map((owner, i) => (
                                    <CopyToClipboard
                                      key={i}
                                      className="pointer mr-1"
                                      text={owner.address}
                                      onCopy={() => {
                                        toast.info(
                                          `${shorten(
                                            owner.address
                                          )} has been copied to clipboard`,
                                          {
                                            position:
                                              toast.POSITION.BOTTOM_CENTER
                                          }
                                        );
                                      }}
                                    >
                                      <Badge color={badgeColorSwitcher(i)}>
                                        {owner.name
                                          ? owner.name
                                          : shorten(owner.address)}
                                      </Badge>
                                    </CopyToClipboard>
                                  ))
                                : "No owners"}
                            </td>
                            <td>
                              {value.dailyLimit
                                ? `${value.dailyLimit} ETH`
                                : "No daily limit"}
                            </td>
                            <td>
                              {value.required && value.owners
                                ? `${value.required}/${value.owners.length}`
                                : "No required confirms"}
                            </td>
                            <td>
                              <Button
                                color="warning"
                                size="sm"
                                className="m-1"
                                onClick={() => this.toggleEdit(value.address)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                className="m-1"
                                onClick={() =>
                                  this.setState({
                                    deleteAlert: true,
                                    selectedContract: value.address
                                  })
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                              <Button color="primary" size="sm" className="m-1">
                                <FontAwesomeIcon icon={faChartLine} />
                              </Button>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
                {wallets && wallets.length !== 0 ? null : (
                  <div className="text-center">
                    No wallets. Add wallet{" "}
                    <a href="/#" onClick={this.toggleAdd}>
                      now
                    </a>
                  </div>
                )}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <SweetAlert
          show={this.state.deleteAlert}
          onConfirm={() => this.handleDeleteConfirm()}
          onCancel={() =>
            this.setState({ deleteAlert: false, selectedContract: false })
          }
          type="warning"
          confirmButtonColor="#DC3545"
          showCancelButton
          confirmButtonText="Yes, delete it!"
          title={`Are you sure you want to delete ${
            this.state.selectedContract
              ? shorten(this.state.selectedContract)
              : null
          } contract?`}
          text="This will delete the contract and all of the stats about it!"
        />
        <CustomModal
          isOpen={this.state.addModal}
          onClose={this.toggleAdd}
          updateWallets={this.updateWallets}
        />
        <EditModal
          isOpen={this.state.editModal}
          onClose={this.toggleEdit}
          updateWallets={this.updateWallets}
          name={name}
          owners={owners}
          address={address}
        />
      </Fragment>
    );
  }
}
