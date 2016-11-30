import * as React from 'react';
import { Row, Card, Col } from 'antd';
import './cards.scss';

const card = () => {
  return (
    <Card title='Card title'>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default class extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={{ padding: '30px 0' }}>
        <Row>
          <Col span={8}>
            <Card title='Card title'>Card content</Card>
          </Col>
          <Col span={8}>
            <Card title='Card title'>Card content</Card>
          </Col>
          <Col span={8}>
            <Card title='Card title'>Card content</Card>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card title='Card title'>Card content</Card>
          </Col>
          <Col span={8}>
            <Card title='Card title'>Card content</Card>
          </Col>
          <Col span={8}>
            <Card title='Card title'>Card content</Card>
          </Col>
        </Row>
      </div>
    );
  }
}