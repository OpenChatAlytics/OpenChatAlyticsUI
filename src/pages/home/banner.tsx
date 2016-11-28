import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const Parallax = require('react-parallax').Parallax;
import { Row, Button } from 'antd';
import './banner.scss';

export default class Banner extends React.Component<{}, {}> {
  public render() {
    return (
      <Parallax bgImage='src/assets/images/banner.jpg' strength={250}>
        <div id='banner'>
          <Row>
            <h1>Open Chatalytics</h1>
            <p>Open source real time chat analytics.</p>
            <p>
              <Button
                type='primary'
                size='large'
                onClick={ () => window.location.href = 'https://github.com/OpenChatAlytics/'}>
                GitHub <i className='fa fa-github'></i>
              </Button>
            </p>
          </Row>
        </div>
      </Parallax>
    );
  }
}