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
import BlockchainService from "../services/blockchainService";

export default class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      wallets: []
    };
  }

  componentDidMount() {
    this.updateWallets();
    BlockchainService.getWalletStats(
      "0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650"
    );
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
                                  console.log("Copied to clip");
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
                                        console.log("Copied to clip");
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
                              <Button color="danger" size="sm" className="m-1">
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
                {wallets ? null : (
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
        <CustomModal
          isOpen={this.state.modal}
          onClose={this.toggle}
          updateWallets={this.updateWallets}
        />
      </Fragment>
    );
  }
}
