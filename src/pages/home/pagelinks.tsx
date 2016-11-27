import * as React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid>
        <Row style={{ textAlign: 'center' }}>
          <Col xs={9} md={6}>
            <h1><i className='fa fa-user-circle-o'></i> Users</h1>
            <p>Explore analytics breakdowns by users</p>
          </Col>
          <Col xs={9} md={6}>
            <h1><i className='fa fa-comments-o'></i> Rooms</h1>
            <p>Explore analytics breakdowns by rooms</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}