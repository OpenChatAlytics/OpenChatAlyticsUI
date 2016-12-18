import * as React from 'react';
import { Row } from 'antd';
import * as moment from 'moment';
import Vega from 'src/pages/components/charts/vega';
import Async from 'src/pages/components/async';
import { connect } from 'react-redux';
import { State } from 'src/flux/reducers';
import { ClientState } from 'src/flux/reducers/client';
import * as ClientActions from 'src/flux/actions/client';

// tslint:disable-next-line:no-var-requires
const example = require('src/assets/chart_examples/area_graph.json');
// tslint:disable-next-line:no-var-requires
const humanize = require('humanize-plus');

interface StatsProps {
  client?: ClientState;
  endDate?: moment.Moment;
  startDate?: moment.Moment;
  fetchUsers?: () => void;
}

export class Stats extends React.Component<StatsProps, {}> {

  public componentWillMount(): void {
    this.props.fetchUsers();
  }

  public render(): JSX.Element {
    const { startDate, endDate, client } = this.props;
    return (
      <div>
        <Row style={{ textAlign: 'center', padding: '5em 0' }}>
          <h1>Over the past {startDate.from(endDate, true)} there have been</h1>
          <h2>
            {humanize.intComma(543977)} chat messages across {humanize.intComma(client.users.size)}
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
    client: state.client,
    endDate: state.dateRange.end,
    startDate: state.dateRange.start,
  };
};

const mapDispatchToProps = (dispatch): StatsProps => {
  return {
    fetchUsers: () => dispatch(ClientActions.getUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);