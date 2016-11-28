import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactNotificationSystem from 'react-notification-system';
import * as _ from 'lodash';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');
import './vega.scss';

class VegaProps {
  public notify?: NotificationSystem.System;
  public spec?: string;
  public width?: number;
  public height?: number;
};

export class Vega extends React.Component<VegaProps, {}> {

  public readonly refs: {
    'vega_container': Element;
  };

  private readonly minWidth = 400;
  private readonly minHeight = 200;

  public componentDidMount() {
    this.embedVega();
  }

  public componentWillReceiveProps(props: VegaProps) {
    if (!_.isEqual(props.spec, props.spec)) {
      this.embedVega();
    }
  }

  public render() {
    return (
      <div ref='vega_container' className='vega-container'>
      </div>
    );
  }

  private embedVega() {
    const { vega_container } = this.refs;
    const embedSpec = {
      actions: false,
      mode: 'vega-lite',
      spec: resizeSpec(this.props.spec,
       Math.max(vega_container.clientWidth, this.minWidth),
       Math.max(vega_container.clientHeight, this.minHeight)),
    };
    embed(vega_container, embedSpec, (error, result) => {
      if (this.props.notify && error) {
        this.props.notify.addNotification({
          level: 'error',
          message: error,
          title: 'Error rendering chart',
        });
      }
    });
  }
}

function resizeSpec(spec: Object, width: number, height: number) {
  if (!spec.hasOwnProperty('config')) {
    spec['config'] = {};
  }
  if (!spec['config'].hasOwnProperty('cell')) {
    spec['config']['cell'] = {};
  }
  spec['config']['cell'].width = width;
  spec['config']['cell'].height = height;
  return spec;
}

const mapStateToProps = (state, props: VegaProps) => {
  return {
    height: props.height,
    notify: state.notifyReducer.container,
    spec: props.spec,
    width: props.width,
  };
};

export default connect(mapStateToProps)(Vega);