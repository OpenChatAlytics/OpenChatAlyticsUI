import * as React from 'react';
import { Row } from 'antd';
import Vega from '../components/charts/vega';
import Cards from '../components/charts/cards';
import Async from '../components/async';
// tslint:disable-next-line:no-var-requires
const steamGraph = require('src/assets/chart_examples/steam_graph.json');
// tslint:disable-next-line:no-var-requires
const table = require('src/assets/chart_examples/table.json');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <Row>
          <h1 className='page-header'>Users</h1>
          <h2>Messages Per User<small> The chattiest users</small></h2>
          <h3>Volume of messages per user over time</h3>
          <Async url={steamGraph}>
            <Vega height={200} />
          </Async>
          <h3>Users with the most total chat messages</h3>
          <Cards />
          <h2>Emojis Per User<small> Emoji experts</small></h2>
          <h3>Users with the most total emojis across all rooms</h3>
          <Cards />
          <h2>Similar Users<small> Users who share common rooms, messages, etc.</small></h2>
          <Async url={table}>
            <Vega height={400} renderer='svg' />
          </Async>
        </Row>
      </div>
    );
  }
}