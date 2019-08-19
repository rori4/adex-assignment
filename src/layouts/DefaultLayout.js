import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from '../components/common/NavBar';

export default class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className='pt-5'>{this.props.children}</Container>
      </div>
    );
  }
}
