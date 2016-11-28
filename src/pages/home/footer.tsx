import * as React from 'react';
import { Grid, Row } from 'react-bootstrap';
import './footer.scss';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <div id='footer'>
        <Grid>
          <Row>
            <h4>Open Chatalytics<small> 2017</small></h4>
          </Row>
        </Grid>
      </div>
    );
  }
}