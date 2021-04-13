import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Footer from './Footer/Footer'
export class Layout extends Component {
  static displayName = Layout.name;
  constructor(props){
    super(props);
  }
  render () {
    return (
      <div>
        <NavMenu  loggedInStatus = {this.props.loggedInStatus}/>
        <Container>
          {this.props.children}
        </Container>
        <Footer/>
      </div>
    );
  }
}
