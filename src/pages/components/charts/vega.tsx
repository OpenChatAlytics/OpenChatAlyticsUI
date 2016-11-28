import * as React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import * as _ from 'lodash';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');
import './vega.scss';

class VegaProps {
  public spec?: Object;
  public width?: number;
  public height?: number;
  public mode?: 'vega' | 'vega-lite';
};

export class Vega extends React.Component<any, any> {

  public readonly refs: {
    vega_container: Element;
  };

  private readonly minWidth = 200;
  private readonly minHeight = 50;

  public componentDidMount() {
    this.embedVega();
  }

  public componentWillReceiveProps(props: VegaProps) {
    if (this.props.height !== props.height ||
        this.props.width !== props.width ||
        !this.props ||
        !_.isEqual(props.spec, this.props.spec)) {
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
      mode: this.props.mode || 'vega-lite',
      spec: resizeSpec(this.props.spec,
       Math.max(this.props.width || vega_container.clientWidth, this.minWidth),
       Math.max(this.props.height || vega_container.clientHeight, this.minHeight)),
    };
    embed(vega_container, embedSpec, (error, result) => {
      if (!error) {
        const canvas = this.refs.vega_container.firstChild.firstChild as HTMLCanvasElement;
        // override the width and height set in style of the canvas to allow the element
        // to scale
        canvas.style.width = '';
        canvas.style.height = '';
      }
      if (this.props.notify && error) {
        message.error('Error rendering chart');
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
    mode: props.mode,
    spec: props.spec,
    width: props.width,
  };
};

export default connect(mapStateToProps)(Vega);