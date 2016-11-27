import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
import Vega from '../components/charts/vega';

export default class extends React.Component<any, any> {
  public render() {
    return (
      <Grid>
        <Row>
          <h1>Users</h1>
          <Vega />
        </Row>
      </Grid>
    );
  }
}