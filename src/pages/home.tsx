import * as React from 'react';
import { connect } from 'react-redux';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Rooms from './components/rooms';
import Users from './components/users';
import * as Actions from 'src/flux/actions';
import * as ReactNotificationSystem from 'react-notification-system';
import './home.scss';

export class Home extends React.Component<any, {}> {

  public readonly refs: {
      notification_system: Element;
  };

  public componentDidMount() {
    this.props.notifyInit(this.refs.notification_system);
  }

  public render() {
    return (
      <div>
        <ReactNotificationSystem ref='notification_system' />
        <Navbar />
        <Banner />
        <Users />
        <Rooms />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
  notifyInit: (container) => dispatch(Actions.notifyInit(container)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);