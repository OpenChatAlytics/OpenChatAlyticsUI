import * as React from 'react';
import { Row } from 'antd';
import * as moment from 'moment';
import Vega from 'src/pages/components/charts/vega';

// tslint:disable-next-line:no-var-requires
const example = require('src/assets/chart_examples/area_graph.json');
// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <Row style={{ textAlign: 'center', padding: '5em 0' }}>
          <h1>Over the past {moment([2015, 1, 15]).fromNow(true)} there have been</h1>
          <h2>
            {humanize.intComma(543977)} chat messages across {humanize.intComma(353)}
            &nbsp;active users in {humanize.intComma(45)} active rooms
          </h2>
        </Row>
        <Row>
          <Vega spec={example} width={1600} height={150} />
        </Row>
      </div>
    );
  }
}