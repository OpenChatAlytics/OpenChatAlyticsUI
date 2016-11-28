import * as React from 'react';
import { Row } from 'antd';
import './footer.scss';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <div id='footer'>
        <Row>
          <h4>Open Chatalytics<small> 2017</small></h4>
        </Row>
      </div>
    );
  }
}