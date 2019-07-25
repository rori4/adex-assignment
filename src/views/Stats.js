import React, { Component } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import StatsBox from "./../components/common/StatsBox";

export default class Home extends Component {
  render() {
    return (
      <DefaultLayout>
        <div className="row">
          <div class="col-xl-3 col-sm-6">
            <StatsBox />
          </div>
          <div class="col-xl-3 col-sm-6">
            <StatsBox />
          </div>
          <div class="col-xl-3 col-sm-6">
            <StatsBox />
          </div>
          <div class="col-xl-3 col-sm-6">
            <StatsBox />
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
