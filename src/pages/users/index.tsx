import * as React from 'react';
import { Row } from 'antd';
import Vega from '../components/charts/vega';
// tslint:disable-next-line:no-var-requires
const example = require('src/assets/chart_examples/steam_graph.json');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Row>
        <h1 className='page-header'>Users</h1>
        <Vega spec={example} height={200} />
      </Row>
    );
  }
}