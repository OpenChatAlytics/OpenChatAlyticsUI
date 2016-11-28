import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Icon, Affix } from 'antd';
import './navbar.scss';

export class Navbar extends React.Component<any, any> {

  public render() {
    return (
      <Affix>
        <Menu
          selectedKeys={[this.props.path]}
          mode='horizontal'
          className='navbar'
          >
          <Menu.Item key='/'>
            <Link to='/' style={{ textTransform: 'uppercase' }}>Open Chatalytics</Link>
          </Menu.Item>
          <Menu.Item key='/users'>
            <Link to='/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key='/rooms'>
            <Link to='/rooms'>Rooms</Link>
          </Menu.Item>
          <Menu.Item key='/entities'>
            <Link to='/entities'>Entities</Link>
          </Menu.Item>
        </Menu>
      </Affix>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    path: state.routing.locationBeforeTransitions.pathname,
  };
};

export default connect(mapStateToProps)(Navbar);