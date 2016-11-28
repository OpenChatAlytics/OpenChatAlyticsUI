import * as React from 'react';
import { Grid, Row, PageHeader } from 'react-bootstrap';
import Vega from '../components/charts/vega';
// tslint:disable-next-line:no-var-requires
const example = require('src/assets/chart_examples/steam_graph.json');

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid>
        <Row>
          <PageHeader>Users</PageHeader>
          <Vega spec={example} height={200} />
        </Row>
      </Grid>
    );
  }
}