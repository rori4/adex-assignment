import React, { Component } from "react";
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
import { Colxx } from "../components/common/CustomBootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import StatsBox from "./../components/common/StatsBox";
import history from "../history";
import BlockchainService from "./../services/blockchainService";
import { utils } from "ethers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shorten } from "./../utils/stringUtils";
import { toast } from "react-toastify";

export default class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      let transactions = await BlockchainService.getTransactionStats(
        history.location.state.address
      );
      this.setState({ transactions, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  calculateAverageTransactionAmount() {
    const { transactions } = this.state;
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      total += Number(utils.formatEther(transactions[i].value));
    }
    return total > 0 ? (total / transactions.length).toFixed(2) : total;
  }

  countTransactionsByStatus(executed) {
    const { transactions } = this.state;
    let count = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].executed === executed) count++;
    }
    return count;
  }

  render() {
    const { transactions, isLoading } = this.state;
    const loadingString = "Loading...";
    return (
      <DefaultLayout>
        <h3>
          Wallet:
          <CopyToClipboard
            className="pointer ml-2"
            text={history.location.state.address}
            onCopy={() => {
              toast.info(
                `${shorten(
                  history.location.state.address
                )} has been copied to clipboard`,
                {
                  position: toast.POSITION.BOTTOM_CENTER
                }
              );
            }}
          >
            <Badge color="secondary">
              {shorten(history.location.state.address)}
            </Badge>
          </CopyToClipboard>
        </h3>
        <div className="row">
          <div className="col-xl-3 col-sm-6">
            <StatsBox
              title="Transaction Count"
              mdiIcon="mdi-counter"
              value={isLoading ? loadingString : transactions.length}
            />
          </div>
          <div className="col-xl-3 col-sm-6">
            <StatsBox
              mdiIcon="mdi-cash"
              title="Avr. Transaction"
              value={
                isLoading
                  ? loadingString
                  : this.calculateAverageTransactionAmount()
              }
            />
          </div>
          <div className="col-xl-3 col-sm-6">
            <StatsBox
              mdiIcon="mdi-timer-sand"
              title="Pending Count"
              value={
                isLoading
                  ? loadingString
                  : this.countTransactionsByStatus(false)
              }
            />
          </div>
          <div className="col-xl-3 col-sm-6">
            <StatsBox
              mdiIcon="mdi-check"
              title="Executed Count"
              value={
                isLoading ? loadingString : this.countTransactionsByStatus(true)
              }
            />
          </div>
        </div>
        <Row className="mb-5">
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Table hover bordered className="stats-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Destination</th>
                      <th>Value</th>
                      <th>Executed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading
                      ? transactions.reverse().map((transaction, index) => (
                          <tr>
                            <td>{transactions.length - index}</td>
                            <td>{transaction.destination}</td>
                            <td>{utils.formatEther(transaction.value)}</td>
                            <td>
                              {transaction.executed ? (
                                <Badge color="success">CONFIRMED</Badge>
                              ) : (
                                <Badge color="warning">PENDING</Badge>
                              )}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
                {isLoading ? (
                  <div className="text-center">Loading wallet data...</div>
                ) : transactions.length === 0 ? (
                  <div className="text-center">
                    No transactions in this contract
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </DefaultLayout>
    );
  }
}
