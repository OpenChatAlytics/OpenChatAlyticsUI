import * as React from 'react';
import { Grid, Row, Button, Jumbotron } from 'react-bootstrap';
import * as Actions from '../../../src/flux/actions';
import { connect } from 'react-redux';
import * as ReactNotificationSystem from 'react-notification-system';

class Banner extends React.Component<any, {}> {
  public render() {
    return (
      <Jumbotron id='banner'>
        <Grid>
          <Row>
            <h1>Open Chatalytics</h1>
            <p>Open source real time chat analytics.</p>
            <p>
              <Button bsStyle='primary'>
                GitHub <i className='fa fa-github'></i>
              </Button>
            </p>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notify: state.notifyReducer.container,
  };
};
const mapDispatchToProps = (dispatch) => ({
    noop: (field, step) => dispatch(Actions.noop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);