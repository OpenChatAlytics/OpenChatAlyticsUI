import * as React from 'react';
import './home.scss';
import { Grid, Row, Panel, Button, Jumbotron, PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Open Chatalytics</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={2} href="#">GitHub <i className="fa fa-github"></i></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Jumbotron id="banner">
          <Grid>
            <Row>
              <h1>Open Chatalytics</h1>
              <p>Open source real time chat analytics.</p>
              <p><Button bsStyle="primary">GitHub <i className="fa fa-github"></i></Button></p>
            </Row>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
          </Row>
        </Grid>
      </div>
    );
  }
}