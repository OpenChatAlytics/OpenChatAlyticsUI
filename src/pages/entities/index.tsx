import * as React from 'react';
import { Grid, Row, PageHeader } from 'react-bootstrap';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid>
        <Row>
          <PageHeader>Entities</PageHeader>
        </Row>
      </Grid>
    );
  }
}