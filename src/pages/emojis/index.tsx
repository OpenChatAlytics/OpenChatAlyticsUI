import * as React from 'react';
import { Row } from 'antd';

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <Row>
        <h1 className='page-header'>Emojis</h1>
      </Row>
    );
  }
}