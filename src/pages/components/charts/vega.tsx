import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactNotificationSystem from 'react-notification-system';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');
// tslint:disable-next-line:no-var-requires
const example = require('./example.json');

export class Vega extends React.Component<{ notify?: NotificationSystem.System }, {}> {

  public readonly refs: {
    'vega_container': Element;
  };

  private readonly embedSpec = {
    actions: false,
    mode: 'vega-lite',
    spec: example,
  };

  public componentDidMount() {
    embed(this.refs.vega_container, this.embedSpec, (error, result) => {
      if (this.props.notify) {
        this.props.notify.addNotification({ title: 'Test notification', level: 'info' });
      }
      if (this.props.notify && error) {
        this.props.notify.addNotification({
          level: 'error',
          message: error,
          title: 'Error rendering chart',
        });
      }
    });
  }

  public render() {
    return (
      <div ref='vega_container'>
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