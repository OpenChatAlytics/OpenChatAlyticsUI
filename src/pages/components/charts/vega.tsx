import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactNotificationSystem from 'react-notification-system';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');
// tslint:disable-next-line:no-var-requires
const example = require('./example.json');

export class Vega extends React.Component<any, any> {

  public componentDidMount() {
    const embedSpec = {
      actions: false,
      mode: 'vega-lite',
      spec: example,
    };
    embed(this.refs['vega-container'], embedSpec, (error, result) => {
      if (this.props.notify) {
        this.props.notify.addNotification({ title: 'test', level: 'info' });
      }
      if (this.props.notify && error) {
        const notification = { title: 'Error rendering chart', message: error, level: 'error' };
        this.props.notify.addNotification(notification);
      }
    });
  }

  public render() {
    return (
      <div ref='vega-container'>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notify: state.notifyReducer.container,
  };
};

export default connect(mapStateToProps)(Vega);