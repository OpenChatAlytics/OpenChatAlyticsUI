import * as React from 'react';
import { IndexLink } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to='/'>Open Chatalytics</IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/users'>
              <NavItem>Users</NavItem>
            </LinkContainer>
            <LinkContainer to='/rooms'>
              <NavItem>Rooms</NavItem>
            </LinkContainer>
            <LinkContainer to='/entities'>
              <NavItem>Entities</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem href='#'
              onClick={ () => window.location.href = 'https://github.com/OpenChatAlytics/' }>
              GitHub <i className='fa fa-github'></i>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}