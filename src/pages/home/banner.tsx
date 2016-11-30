import * as React from 'react';
import { Row, Button, Icon } from 'antd';
import './banner.scss';

export default class Banner extends React.Component<{}, {}> {
  public render() {
    return (
      <div id='banner'>
        <Row>
          <h1>Open Chatalytics</h1>
          <p>Open source real time chat analytics.</p>
          <p>
            <Button
              type='primary'
              size='large'
              onClick={ () => window.location.href = 'https://github.com/OpenChatAlytics/'}>
              GitHub <Icon type='github' />
            </Button>
          </p>
        </Row>
      </div>
    );
  }
}