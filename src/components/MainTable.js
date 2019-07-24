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
import { shorten } from "./../utils/stringUtils";
import BlockchainService from "../services/blockchainService";

export default class MainTable extends Component {
  static storageService = new StorageService();
  static blockchainService = new BlockchainService();
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      wallets: []
    };
  }

  componentDidMount() {
    this.updateWallets();
    MainTable.blockchainService.get("0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c");
  }

  updateWallets = () => {
    const wallets = MainTable.storageService.getAll();
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
                      <th>Confirsm</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallets
                      ? wallets.map((value, index) => (
                          <tr key={index}>
                            <th scope="row">{value.name}</th>
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
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>
                              <Button
                                color="warning"
                                size="sm"
                                className="m-1"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button color="danger" size="sm" className="m-1">
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                              <Button
                                color="primary"
                                size="sm"
                                className="m-1"
                              >
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
        <CustomModal isOpen={this.state.modal} onClose={this.toggle} updateWallets={this.updateWallets}/>
      </Fragment>
    );
  }
}
