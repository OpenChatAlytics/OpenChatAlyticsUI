import React, { Component } from 'react';
import MainStore from '../../stores/MainStore';
import UserComponent from './User';
import AsyncComponent from '../Chatalytics/Async';

// Constructs a top entity visualization
// assume data in the format
// [{
//   title:
//   subtitle:
//   summary:
//   value:
//  }, ... ]
// Will automatically sort results by value.
export default class AwardsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data.sort((a, b) => { return b.value - a.value; }),
      maxValue: _.maxBy(this.props.data, o => o.value).value
    };
  }

  render() {
    return (
      (this.state.data && this.state.data.length > 3) ?
      <div>
        <div className="awards">
          <div style={{ float: 'left' }}>
            <div>
              <div style={{ float: 'left' }} className="award-one">1st</div>
              <div style={{ float: 'left' }}>
                <h2><UserComponent name={this.state.data[0].key} title={this.state.data[0].title} /></h2>
                <h3>{this.state.data[0].subtitle}</h3>
              </div>
              <div style={{ clear: 'both' }} />
            </div>
          </div>
          <div style={{ float: 'left' }}>
            <div>
              <div style={{ float: 'left' }} className="award-two">2nd</div>
              <div style={{ float: 'left' }}>
                <h2><UserComponent name={this.state.data[1].key} title={this.state.data[1].title} /></h2>
                <h3>{this.state.data[1].subtitle}</h3>
              </div>
              <div style={{ clear: 'both' }} />
            </div>
          </div>
          <div style={{ float: 'left' }}>
            <div>
              <div style={{ float: 'left' }} className="award-three">3rd</div>
              <div style={{ float: 'left' }}>
                <h2><UserComponent name={this.state.data[2].key} title={this.state.data[2].title} /></h2>
                <h3>{this.state.data[2].subtitle}</h3>
              </div>
              <div style={{ clear: 'both' }} />
            </div>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
        {this.state.data.slice(3).map((e, i) => {
          return (
            <div key={i} className="entity-mini">
              <div style={{ float: "left" }} >
                <UserComponent name={e.key} />
              </div>
              <div style={{ float: "left" }} >
                <div className="entity-mini-title">{e.title}</div>
                <div className="entity-mini-summary">{e.summary}</div>
                <div className="entity-mini-subtitle">{e.subtitle}</div>
                <div style={{ width: `${e.value / this.state.maxValue * 100}%`, background: 'black', height: '5px' }} />
              </div>
              <div style={{ clear: "both" }} />
            </div>
          )
        }) }
        <div style={{ clear: 'both' }} />
      </div> :
      <div />
    );
  }
}