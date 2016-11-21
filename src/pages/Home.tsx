import * as React from 'react';
import { Grid, Row, Panel, Button, Jumbotron, PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as Actions from '../flux/actions';
import { connect } from 'react-redux';
import './home.scss';

class Home extends React.Component<any, any> {

  onPrimaryButtonClick = () => {
    const { dispatch } = this.props;
    console.log(this.props);
  }

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
              <p><Button onClick={this.props.noop} bsStyle="primary">GitHub <i className="fa fa-github"></i></Button></p>
            </Row>
          </Grid>
        </Jumbotron>
        
        <Grid>
          <Row>
            <h2>Users</h2>
          </Row>
        </Grid>

        <Grid>
          <Row>
            <h2>Rooms</h2>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
    noop: (field, step) => {
        dispatch({ type: Actions.NOOP });
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home)