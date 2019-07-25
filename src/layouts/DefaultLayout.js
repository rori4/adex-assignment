import React, { Component } from "react";
import NavBar from "../components/common/NavBar";
import { Container} from 'reactstrap';

export default class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="pt-5">{this.props.children}</Container>
      </div>
    );
  }
}
