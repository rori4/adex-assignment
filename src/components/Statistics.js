import React, { Component } from 'react';
import StatsBox from './common/StatsBox';

export default class Statistics extends Component {
	render() {
		return (
			<div class='row'>
				<div class='col-xl-3 col-sm-6'>
					<StatsBox></StatsBox>
				</div>
			</div>
		);
	}
}
