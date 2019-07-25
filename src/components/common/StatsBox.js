import React, { Component } from "react";

export default class StatsBox extends Component {
  render() {
    return (
      <div className="card-box widget-box-two widget-two-custom">
        <i
          className={
            this.props.mdiIcon
              ? `mdi widget-two-icon ${this.props.mdiIcon}`
              : ""
          }
        />
        <div className="wigdet-two-content">
          <p
            className="m-0 text-uppercase font-bold font-secondary text-overflow"
            title="Statistics"
          >
            {this.props.title}
          </p>
          <h2 className="font-600">
            <span data-plugin="counterup">{this.props.value}</span>
          </h2>
        </div>
      </div>
    );
  }
}
