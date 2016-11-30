import * as React from 'react';
import { Link } from 'react-router';

// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');
// tslint:disable-next-line:no-var-requires
import { Icon, Row, Col } from 'antd';

import './pagelinks.scss';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='card-links'>
        <Row>
          <h1 className='page-header'>
            Categories <small>View detailed analytics broken down by specific categories</small>
          </h1>
        </Row>
        <Row style={{ textAlign: 'center', padding: '2.5em 0' }}>
          <Col span={12}>
            <Link to='/users'>
              <h1><Icon type='team' /> Users</h1>
              <p>Explore analytics breakdowns by users</p>
            </Link>
          </Col>
          <Col span={12}>
            <Link to='/rooms'>
              <h1><Icon type='switcher' /> Rooms</h1>
              <p>Explore analytics breakdowns by chat rooms (channels)</p>
            </Link>
          </Col>
        </Row>
        <Row style={{ textAlign: 'center', padding: '2.5em 0' }}>
          <Col span={12}>
            <Link to='/entities'>
              <h1><Icon type='tags' /> Entities</h1>
              <p>Explore analytics breakdowns by topics (entities)</p>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}