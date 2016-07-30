import React, { Component } from 'react';
import moment from 'moment';

export default class DatePickerComponent extends Component {

  constructor(props) {
    super(props);

    this.setAllTime = this.setAllTime.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setHalfYear = this.setHalfYear.bind(this);
    this.setQuarterYear = this.setQuarterYear.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.setWeek = this.setWeek.bind(this);
  }

  setAllTime() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'century');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  setYear() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'year');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  setHalfYear() {
    const endDate = moment();
    const startDate = moment().subtract(6, 'months');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  setQuarterYear() {
    const endDate = moment();
    const startDate = moment().subtract(3, 'months');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  setMonth() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'months');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  setWeek() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'week');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
  }

  render() {
    return (
      <div>
        <div className="button-group">
          <span className="button-group-label">Time Range</span>
          <button onClick={this.setAllTime}>All Time</button>
          <button onClick={this.setYear}>1 Year</button>
          <button onClick={this.setHalfYear}>6 months</button>
          <button onClick={this.setQuarterYear}>3 months</button>
          <button onClick={this.setMonth}>1 Month</button>
          <button onClick={this.setWeek}>1 Week</button>
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}
