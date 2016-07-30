import React, { Component } from 'react';
import TwoColumnFixed from '../Layouts/TwoColumnFixed';
import MainStore from '../../stores/MainStore';
import MainActions from '../../actions/MainActions';
import AsyncComponent from './Async';
import TableComponent from './Table';
import AwardsComponent from '../Layouts/Awards';
import EmojiComponent from '../Layouts/Emoji';
import { Line } from 'react-chartjs';
import AltContainer from 'alt-container';
import SimilarityComponent from './Similarity';
import DatePickerComponent from '../DatePicker';

export default class EmojisComponent extends Component {
  render() {
    return (
      <div className="chatalytics" id="emojis">
        <AltContainer store={ MainStore }>
          <EmojisSummaryComponent />
          <h3>Trending</h3>
          <p>The most popular emojis by usage over the past year.</p>
          <TwoColumnFixed leftWidth='25%' left={<EmojisStatisticsComponent />}
            right={<EmojisTimeChart />} />
          <h3>User</h3>
          <p>The most prolific emoji users by total number of emojis used.</p>
          <EmojisPerUserComponent />
          <h3>Room</h3>
          <p>These rooms are mostly emojis at this point.</p>
          <EmojisPerRoomComponent />
          <h3>Similarity</h3>
          <DatePickerComponent
            onDateChanged={(starttime, endtime) => MainActions.fetchEmojiSimilarities({ starttime, endtime })}
          />
          <TwoColumnFixed leftWidth='49%'
            left={<SimilarityComponent
              title="User Similarity by Emojis Used" similarity={this.props.userSimilarityByEmoji} />}
            right={<SimilarityComponent
              title="Room Similarity by Emojis Used" similarity={this.props.roomSimilarityByEmoji} />} />
        </AltContainer>
      </div>
    );
  }
}

class EmojisSummaryComponent extends Component {
  render() {
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
  render() {
    return (
      <AsyncComponent isLoaded={ () => this.props.trendingEmojis != null }
        loaded={
          <div>
            <h4>Top Emojis Past Year</h4>
            <TableComponent columns={['key', 'value']}
              aliases={['Emoji', 'Mentions']}
              data={ (this.props.trendingEmojis || []).map(e => {
                          return {
                            key: <AltContainer store={ MainStore }><EmojiComponent name={e.key}/></AltContainer>,
                            value: e.value
                          }
                        }
                      )
                    } />
          </div>
        }
      />
    );
  }
}

class EmojisPerUserComponent extends Component {
  render() {
    return (
      <div>
        <DatePickerComponent
          onDateChanged={(starttime, endtime) => MainActions.fetchActiveEmojisByUser({ starttime, endtime })}
        />
        <AsyncComponent isLoaded={ () => this.props.activeEmojisByUser != null }
          loaded={ this.props.activeEmojisByUser ?
            <AwardsComponent data={this.props.activeEmojisByUser } />
            : <div />} />
      </div>
    )
  }
}

class EmojisPerRoomComponent extends Component {
  render() {
    return (
      <div>
        <DatePickerComponent
          onDateChanged={(starttime, endtime) => MainActions.fetchActiveEmojisByRoom({ starttime, endtime })}
        />
        <AsyncComponent isLoaded={ () => this.props.activeEmojisByRoom != null }
          loaded={ this.props.activeEmojisByRoom ?
            <AwardsComponent data={this.props.activeEmojisByRoom } />
            : <div />} />
      </div>
    )
  }
}

class EmojisTimeChart extends Component {
  render() {
    let options = {
      defaultFontFamily: 'PTMono',
      defaultFontSize: 12,
      responsive: true,
      legend: {
        position: 'bottom'
      },
      maintainAspectRatio: false,
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
        <AsyncComponent isLoaded={ () => this.props.trendingEmojisOverTime != null && this.props.trendingEmojis != null }
          loaded={ this.props.trendingEmojisOverTime && this.props.trendingEmojis ?
            <Line ref="chart" data={this.props.trendingEmojisOverTime.clone() }
              options={ options } height="450" />
            : <div />} />
      </div>
    );
  }
}