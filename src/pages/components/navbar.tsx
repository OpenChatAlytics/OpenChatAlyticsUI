import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>Open Chatalytics</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={2} href='#'>GitHub <i className='fa fa-github'></i></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}