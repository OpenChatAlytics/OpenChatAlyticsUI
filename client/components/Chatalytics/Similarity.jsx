import AsyncComponent from './Async';
import { Bubble } from 'react-chartjs';
import React, { Component } from 'react';

export default class SimilarityComponent extends Component {
  render() {
    let labels = this.props.similarity ? this.props.similarity.clone().labels : [];
    let options = {
      defaultFontFamily: 'PTMono',
      defaultFontSize: 12,
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {
        callbacks: {
           label: (item, data) => { return `${data.labels[item.xLabel]}, ${data.labels[item.yLabel]}`; },
         },
      },
      hover: {
        mode: 'label',
      },
      elements: {
        point: {
          backgroundColor: 'rgba(65, 128, 255, 0.05)',
          hitRadius: 1,
          hoverRadius: 4,
          hoverBorderWidth: 10,
          radius: 10,
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            max: labels.length,
            stepSize: 1,
            autoSkip: false,
            callback: (value) => {
              return labels[value];
            },
          },
          scaleLabel: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
            reverse: true,
            min: 0,
            max: labels.length,
            stepSize: 1,
            autoSkip: false,
            callback: (value) => {
              return labels[value];
            },
          },
          scaleLabel: {
            display: false,
          },
        }],
      },
      legend: {
        display: false,
      },
    };

    return (
      <div>
        <h4>{this.props.title}</h4>
        <div id="chartjs-tooltip"></div>
        <AsyncComponent isLoaded={() => this.props.similarity != null}
          loaded={this.props.similarity ?
            <Bubble ref="chart" data={this.props.similarity.clone()}
              width={700} height={700}
              options={options}
            />
            : <div />}
        />
      </div>
    );
  }
}
