import React, { Component } from "react";

export default class StatsBox extends Component {
  render() {
    return (
      <div class="card-box widget-box-two widget-two-custom">
        <i class="mdi mdi-currency-usd widget-two-icon" />
        <div class="wigdet-two-content">
          <p
            class="m-0 text-uppercase font-bold font-secondary text-overflow"
            title="Statistics"
          >
            Total Revenue
          </p>
          <h2 class="font-600">
            <span>
              <i class="mdi mdi-arrow-up" />
            </span>{" "}
            <span data-plugin="counterup">65841</span>
          </h2>
        </div>
      </div>
    );
  }
}
