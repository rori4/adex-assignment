import React, { Component } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import MainTable from './../components/MainTable';

export default class Home extends Component {
  render() {
    return (
      <DefaultLayout>
        <MainTable />
      </DefaultLayout>
    );
  }
}
