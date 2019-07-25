import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
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
import StorageService from "../services/storageService";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shorten, badgeColorSwitcher } from "./../utils/stringUtils";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert-react";

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteAlert: false,
      selectedContract: false,
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

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleDeleteConfirm = () => {
    console.log("DELETE");
    StorageService.delete(this.state.selectedContract);
    this.updateWallets();
    this.setState({ deleteAlert: false, selectedContract: false });
  };

  render() {
    const { wallets } = this.state;
    return (
      <Fragment>
        <Row className="mb-5">
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Button className="mb-2" color="success" onClick={this.toggle}>
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Contract
                </Button>
                <CardTitle>Multi Signature Wallet Contracts</CardTitle>
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
                                      className="pointer mr-1"
                                      text={owner}
                                      onCopy={() => {
                                        toast.info(
                                          `${shorten(
                                            owner
                                          )} has been copied to clipboard`,
                                          {
                                            position:
                                              toast.POSITION.BOTTOM_CENTER
                                          }
                                        );
                                      }}
                                    >
                                      <Badge color={badgeColorSwitcher(i)}>
                                        {shorten(owner)}
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
                              <Button color="warning" size="sm" className="m-1">
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
                {wallets.length !== 0 ? null : (
                  <div className="text-center">
                    No wallets. Add wallet{" "}
                    <a href="/#" onClick={this.toggle}>
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
          isOpen={this.state.modal}
          onClose={this.toggle}
          updateWallets={this.updateWallets}
        />
      </Fragment>
    );
  }
}
