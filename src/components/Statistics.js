import React, { Component } from 'react';
import StatsBox from './common/StatsBox';

export default class Statistics extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-xl-3 col-sm-6'>
          <StatsBox />
        </div>
      </div>
    );
  }
}
