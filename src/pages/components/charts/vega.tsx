import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const embed = require('vega-embed');
// tslint:disable-next-line:no-var-requires
const example = require('./example.json');

export default class extends React.Component<any, any> {

  public initializeVega(container: HTMLDivElement) {
    const embedSpec = {
      actions: false,
      mode: 'vega-lite',
      spec: example,
    };
    embed(container, embedSpec, (error, result) => {
      // Callback receiving the View instance and parsed Vega spec
      // result.view is the View, which resides under the '#vis' element
    });
  }

  public render() {
    return (
      <div ref={(container) => this.initializeVega(container)}>
      </div>
    );
  }
}