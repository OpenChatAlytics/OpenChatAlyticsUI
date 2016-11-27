import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
import * as moment from 'moment';

// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid>
        <Row style={{ textAlign: 'center' }}>
          <h1>Over the past {moment([2015, 1, 15]).fromNow(true)} there have been</h1>
          <h2>
            {humanize.intComma(543977)} chat messages across {humanize.intComma(353)}
            &nbsp;active users in {humanize.intComma(45)} active rooms
          </h2>
        </Row>
      </Grid>
    );
  }
}