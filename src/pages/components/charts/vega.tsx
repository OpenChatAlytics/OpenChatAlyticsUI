import * as React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import * as _ from 'lodash';
import { State } from 'src/flux/reducers';
import * as Actions from 'src/flux/actions';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');
import './vega.scss';

class VegaProps {
  public data?: Object;
  public width?: number;
  public height?: number;
  public mode?: 'vega' | 'vega-lite';
  public fetch?: any;
};

export class Vega extends React.Component<VegaProps, {}> {

  public readonly refs: {
    vega_container: Element;
  };

  private readonly minWidth = 200;
  private readonly minHeight = 50;

  public componentDidMount(): void {
    this.embedVega();
  }

  public componentWillReceiveProps(props: VegaProps): void {
    if (this.props.height !== props.height ||
        this.props.width !== props.width ||
        !this.props ||
        !_.isEqual(props.data, this.props.data)) {
      this.embedVega();
    }
  }

  public render(): JSX.Element {
    return (
      <div ref='vega_container' className='vega-container'>
      </div>
    );
  }

  private embedVega(): void {
    const { vega_container } = this.refs;
    const embedSpec = {
      actions: false,
      mode: this.props.mode || 'vega-lite',
      spec: resizeSpec(this.props.data,
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
      if (error) {
        message.error('Error rendering chart');
      }
    });
  }
}

/**
 * Resizes the Vega specification config object to the given width and height.
 * Used to fit a Vega specification to the viewport.
 * 
 * @param spec The Vega specification
 * @param width The desired width
 * @param height The desired height
 * @returns The modified Vega specification
 */
const resizeSpec = (spec: Object, width: number, height: number): Object => {
  if (!spec.hasOwnProperty('config')) {
    spec['config'] = {};
  }
  if (!spec['config'].hasOwnProperty('cell')) {
    spec['config']['cell'] = {};
  }
  spec['config']['cell'].width = width;
  spec['config']['cell'].height = height;
  return spec;
};

const mapStateToProps = (state: State, props: VegaProps): VegaProps => {
  return {
    data: props.data,
    height: props.height,
    mode: props.mode,
    width: props.width,
  };
};

export default connect(mapStateToProps)(Vega);