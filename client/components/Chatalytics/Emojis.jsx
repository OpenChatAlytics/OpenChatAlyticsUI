import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TwoColumn from '../Layouts/TwoColumn';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import Highcharts from 'highcharts';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import ChartJS, { Line, Bubble, Bar } from 'react-chartjs';
import _ from 'lodash';

export default class EmojisComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="chatalytics" id="emojis">
        <EmojisSummaryComponent />
        <h3>Trending</h3>
        <p>The most popular emojis by usage over the past year.</p>
        <TwoColumnFixed leftWidth='300px' left={<EmojisStatisticsComponent />}
          right={<EmojisTimeChart />} />
        <h3>User</h3>
        <p>The most prolific emoji users by total number of emojis used.</p>
        <EmojisPerUserComponent />
        <h3>Room</h3>
        <p>These rooms are mostly emojis at this point.</p>
        <EmojisPerRoomComponent />
      </div>
    );
  }
}

class EmojisSummaryComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.allEmojis != null;
  }

  render() {
    // <p>
    //   In the past year, over {this.state.allEmojis ? this.state.allEmojis.length : "?"} emojis were used, below is the breakdown of emoji usage by type , user and channel (room).
    // </p>
    return (
      <div>
        <h2>Emojis</h2>
        <blockquote>
        <p>
        The first emoji was created in 1998 or 1999 in Japan by Shigetaka Kurita, who was part of the team working on NTT DoCoMo's i-mode mobile Internet platform. Kurita took inspiration from weather forecasts that used symbols to show weather, Chinese characters and street signs, and from manga that used stock symbols to express emotions, such as lightbulbs signifying inspiration.  The first set of 172 12×12 pixel emoji was created as part of i-mode's messaging features to help facilitate electronic communication, and to serve as a distinguishing feature from other services.Kurita created the first 180 emoji based on the expressions that he observed people making and other things in the city.
        </p>
        <p>
        Originally meaning pictograph, the word emoji comes from Japanese e (絵, "picture") + moji (文字, "character"). The apparent resemblance to the English words "emotion" and "emoticon" is just a coincidence.  Today, there are over 1700 standard emoji defined in the Unicode standard.
        </p>
        <footer>- <a href="https://en.wikipedia.org/wiki/Emoji">https://en.wikipedia.org/wiki/Emoji</a></footer>
        </blockquote>
      </div>
    );
  }
}

class EmojisStatisticsComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.trendingEmojis != null;
  }

  render() {
    return (
      <AsyncComponent isLoaded={this.isLoaded.bind(this) }
        loaded={
          <div>
            <h4>Top Emojis Past Year</h4>
            <TableComponent columns={['key', 'value']}
              aliases={['Emoji', 'Mentions']}
              data={ (this.state.trendingEmojis || []).map(e => { 
                return {
                  key: <EmojiComponent name={e.key}/>, 
                  value: e.value }
                }
                ) 
              } />
          </div>  }
        />
    );
  }
}

class EmojisPerUserComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.activeEmojisByUser != null;
  }

  render() {
    return (
      <AsyncComponent isLoaded={this.isLoaded.bind(this) }
        loaded={ this.state.activeEmojisByUser ?
          <AwardsComponent data={this.state.activeEmojisByUser } />
          : <div />} />
    )
  }
}

class EmojiComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.emojiIcons != null;
  }

  render() {
    return (
      <div>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.emojiIcons ?
              <div>
                <img className="emoji" src={this.state.emojiIcons[this.props.name]} />
                <span>{this.props.name}</span>
              </div>
            : <span>{this.props.name}</span>} />
        
      </div>
    )
  }
}

class UserComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.userIcons != null;
  }

  render() {
    return (
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.userIcons ?
              <span><img className="user" src={this.state.userIcons[this.props.name]} />{this.props.title}</span>
            : <span></span>} />
    )
  }
}

class EmojisPerRoomComponent extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.activeEmojisByRoom != null;
  }

  render() {
    return (
      <AsyncComponent isLoaded={this.isLoaded.bind(this) }
        loaded={ this.state.activeEmojisByRoom ?
          <AwardsComponent data={this.state.activeEmojisByRoom } />
          : <div />} />
    )
  }
}

// Constructs a top entity visualization
// assume data in the format 
// [{
//   title:
//   subtitle:
//   summary:
//   value:
//  }, ... ]
// Will automatically sort results by value.
class AwardsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data.sort((a, b) => { return b.value - a.value; }),
      maxValue: _.maxBy(this.props.data, o => o.value).value
    };
  }

  render() {
    return (
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
      </div>
    );
  }
}

class EmojisTimeChart extends Component {

  constructor() {
    super();
    this.state = MainStore.getState();
  }

  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  isLoaded(state) {
    return state.trendingEmojisOverTime != null
           && state.trendingEmojis != null;
  }
  
  filterData() {
    let teot = this.state.trendingEmojisOverTime.clone();
    let emojis = this.state.trendingEmojis; // [ { key: "simple_smile" }, ...]
    // console.log(teot);
  }

  render() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.global.defaultFontFamily = 'PTMono';
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.responsive = true;
      Chart.defaults.global.legend.position = 'bottom';
      // Chart.defaults.global.maintainAspectRatio = false;
    }
    let options = {
      responsive: true,
      tooltips: {
        mode: 'single',
      },
      hover: {
        mode: 'dataset'
      },
      elements: {
        point: {
          radius: 2
        }
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Number Mentions'
          }
        }]
      }
    }
    return (
      <div>
        <h4>Top Emojis by Month</h4>
        <AsyncComponent isLoaded={this.isLoaded.bind(this) }
          loaded={ this.state.trendingEmojisOverTime && this.state.trendingEmojis ?
            <Line ref="chart" data={this.state.trendingEmojisOverTime.clone() }
              options={ options } />
            : <div />} />
      </div>
    );
  }
}