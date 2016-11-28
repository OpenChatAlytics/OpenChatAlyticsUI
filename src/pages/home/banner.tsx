import * as React from 'react';
import { Grid, Row, Button, Jumbotron } from 'react-bootstrap';
// tslint:disable-next-line:no-var-requires
const Parallax = require('react-parallax').Parallax;
import './banner.scss';

export default class Banner extends React.Component<{}, {}> {
  public render() {
    return (
      <Parallax bgImage='src/assets/images/banner.jpg' strength={250}>
        <Jumbotron id='banner'>
          <Grid>
            <Row>
              <h1>Open Chatalytics</h1>
              <p>Open source real time chat analytics.</p>
              <p>
                <Button bsStyle='primary'
                  onClick={ () => window.location.href = 'https://github.com/OpenChatAlytics/'}>
                  GitHub <i className='fa fa-github'></i>
                </Button>
              </p>
            </Row>
          </Grid>
        </Jumbotron>
      </Parallax>
    );
  }
}