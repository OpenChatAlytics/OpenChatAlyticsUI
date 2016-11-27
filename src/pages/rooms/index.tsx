import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';

export default class extends React.Component<any, any> {
  public render() {
    return (
      <Grid>
        <Row>
          <h1>Rooms</h1>
        </Row>
      </Grid>
    );
  }
}