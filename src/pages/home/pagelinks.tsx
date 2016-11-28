import * as React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';

// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

import './pagelinks.scss';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid className='card-links'>
        <Row>
          <PageHeader>
            Categories <small>View detailed analytics broken down by specific categories</small>
          </PageHeader>
        </Row>
        <Row style={{ textAlign: 'center', padding: '2.5em 0' }}>
          <Col xs={9} md={6}>
            <Link to='/users'>
              <h1><i className='fa fa-user-circle-o'></i> Users</h1>
              <p>Explore analytics breakdowns by users</p>
            </Link>
          </Col>
          <Col xs={9} md={6}>
            <Link to='/rooms'>
              <h1><i className='fa fa-comments-o'></i> Rooms</h1>
              <p>Explore analytics breakdowns by chat rooms (channels)</p>
            </Link>
          </Col>
        </Row>
        <Row style={{ textAlign: 'center', padding: '2.5em 0' }}>
          <Col xs={9} md={6}>
            <Link to='/entities'>
              <h1><i className='fa fa-coffee'></i> Entities</h1>
              <p>Explore analytics breakdowns by topics (entities)</p>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}