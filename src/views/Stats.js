import React, { Component } from 'react';
import { Row, Card, CardBody, Table, Badge } from 'reactstrap';
import { Colxx } from '../components/common/CustomBootstrap';
import DefaultLayout from '../layouts/DefaultLayout';
import StatsBox from './../components/common/StatsBox';
import history from '../history';
import BlockchainService from './../services/blockchainService';
import { utils } from 'ethers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { shorten } from './../utils/stringUtils';
import { toast } from 'react-toastify';

export default class Stats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			isLoading: true,
			balance: '?',
		};
		this.updateStats = this.updateStats.bind(this);
	}

	async componentDidMount() {
		try {
			BlockchainService.addEventListeners(
				history.location.state.address,
				this.updateStats
			);
			this.updateStats();
		} catch (error) {
			console.log(error);
		}
	}

	componentWillUnmount() {
		BlockchainService.removeEventListeners(history.location.state.address);
	}

  updateStats = async () => {
  	let address = history.location.state.address;
  	let transactions = await BlockchainService.getTransactionStats(address);
  	const balance = await BlockchainService.getBalance(address);
  	if (transactions)
  		this.setState({ transactions, isLoading: false, balance });
  };

  calculateAverageTransactionAmount() {
  	const { transactions } = this.state;
  	let total = 0;
  	for (let i = 0; i < transactions.length; i++) {
  		total += Number(utils.formatEther(transactions[i].value));
  	}
  	return total > 0 ? (total / transactions.length).toFixed(4) : total;
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
  	const { transactions, isLoading, balance } = this.state;
  	const loadingString = 'Loading...';
  	return (
  		<DefaultLayout>
  			<h3>
          Wallet ({balance} ETH):
  				<CopyToClipboard
  					className='pointer ml-2'
  					text={history.location.state.address}
  					onCopy={() => {
  						toast.info(
  							`${shorten(
  								history.location.state.address
  							)} has been copied to clipboard`,
  							{
  								position: toast.POSITION.BOTTOM_CENTER,
  							}
  						);
  					}}
  				>
  					<Badge color='secondary'>
  						{shorten(history.location.state.address)}
  					</Badge>
  				</CopyToClipboard>
  			</h3>
  			<div className='row'>
  				<div className='col-xl-3 col-sm-6'>
  					<StatsBox
  						title='Transactions'
  						mdiIcon='mdi-counter'
  						value={isLoading ? loadingString : transactions.length}
  					/>
  				</div>
  				<div className='col-xl-3 col-sm-6'>
  					<StatsBox
  						mdiIcon='mdi-cash'
  						title='Avr. Transaction'
  						value={
  							isLoading
  								? loadingString
  								: this.calculateAverageTransactionAmount()
  						}
  					/>
  				</div>
  				<div className='col-xl-3 col-sm-6'>
  					<StatsBox
  						mdiIcon='mdi-timer-sand'
  						title='Pending'
  						value={
  							isLoading
  								? loadingString
  								: this.countTransactionsByStatus(false)
  						}
  					/>
  				</div>
  				<div className='col-xl-3 col-sm-6'>
  					<StatsBox
  						mdiIcon='mdi-check'
  						title='Confirmed'
  						value={
  							isLoading ? loadingString : this.countTransactionsByStatus(true)
  						}
  					/>
  				</div>
  			</div>
  			<Row className='mb-5'>
  				<Colxx xxs='12'>
  					<Card className='mb-4'>
  						<CardBody>
  							<Table hover bordered className='stats-table'>
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
  											<tr key={index}>
  												<td>{transactions.length - index}</td>
  												<td>{transaction.destination}</td>
  												<td>{utils.formatEther(transaction.value)}</td>
  												<td>
  													{transaction.executed ? (
  														<Badge color='success'>CONFIRMED</Badge>
  													) : (
  														<Badge color='warning'>PENDING</Badge>
  													)}
  												</td>
  											</tr>
  										))
  										: null}
  								</tbody>
  							</Table>
  							{isLoading ? (
  								<div className='text-center'>Loading wallet data...</div>
  							) : transactions.length === 0 ? (
  								<div className='text-center'>
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
