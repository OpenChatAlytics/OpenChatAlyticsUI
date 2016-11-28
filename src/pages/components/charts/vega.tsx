import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactNotificationSystem from 'react-notification-system';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');

class VegaProps {
  public notify?: NotificationSystem.System;
  public spec?: string;
};

export class Vega extends React.Component<VegaProps, {}> {

  public readonly refs: {
    'vega_container': Element;
  };

  public componentDidMount() {
    const embedSpec = {
      actions: false,
      mode: 'vega-lite',
      spec: this.props.spec,
    };
    embed(this.refs.vega_container, embedSpec, (error, result) => {
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

const mapStateToProps = (state, props) => {
  return {
    notify: state.notifyReducer.container,
    spec: props.spec,
  };
};

export default connect(mapStateToProps)(Vega);