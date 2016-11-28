import * as React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid>
        <Row style={{  }}>
          <PageHeader>
            Categories <small>View detailed analytics broken down by specific categories</small>
          </PageHeader>
        </Row>
        <Row style={{ textAlign: 'center', padding: '2.5em 0' }}>
          <Col xs={9} md={6}>
            <h1><i className='fa fa-user-circle-o'></i> Users</h1>
            <p>Explore analytics breakdowns by users</p>
          </Col>
          <Col xs={9} md={6}>
            <h1><i className='fa fa-comments-o'></i> Rooms</h1>
            <p>Explore analytics breakdowns by chat rooms (channels)</p>
          </Col>
        </Row>
        <Row style={{ textAlign: 'center', padding: '2.5em 0' }}>
          <Col xs={9} md={6}>
            <h1><i className='fa fa-coffee'></i> Entities</h1>
            <p>Explore analytics breakdowns by topics (entities)</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}