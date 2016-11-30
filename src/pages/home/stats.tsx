import * as React from 'react';
import { Row } from 'antd';
import * as moment from 'moment';
import Vega from 'src/pages/components/charts/vega';
import Async from 'src/pages/components/async';
import { connect } from 'react-redux';
import { State } from 'src/flux/reducers';

// tslint:disable-next-line:no-var-requires
const example = require('src/assets/chart_examples/area_graph.json');
// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

interface StatsProps {
  endDate?: moment.Moment;
  startDate?: moment.Moment;
}

export class Stats extends React.Component<StatsProps, {}> {
  public render() {
    const { startDate, endDate } = this.props;
    return (
      <div>
        <Row style={{ textAlign: 'center', padding: '5em 0' }}>
          <h1>Over the past {startDate.from(endDate, true)} there have been</h1>
          <h2>
            {humanize.intComma(543977)} chat messages across {humanize.intComma(353)}
            &nbsp;active users in {humanize.intComma(45)} active rooms
          </h2>
        </Row>
        <Row>
          <Async url={example}>
            <Vega />
          </Async>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: State, props: StatsProps): StatsProps => {
  return {
    endDate: state.dateRange.end || moment(),
    startDate: state.dateRange.start || moment(),
  };
};

export default connect(mapStateToProps)(Stats);