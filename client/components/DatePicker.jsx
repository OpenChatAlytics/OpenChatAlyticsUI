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

    this.state = { active: 'year' };
  }

  setAllTime() {
    const endDate = moment();
    const startDate = moment().subtract(100, 'years');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    this.setState({ active: 'alltime' });
  }

  setYear() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'year');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    this.setState({ active: 'year' });
  }

  setHalfYear() {
    const endDate = moment();
    const startDate = moment().subtract(6, 'months');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    this.setState({ active: 'halfyear' });
  }

  setQuarterYear() {
    const endDate = moment();
    const startDate = moment().subtract(3, 'months');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    this.setState({ active: 'quarteryear' });
  }

  setMonth() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'months');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    this.setState({ active: 'month' });
  }

  setWeek() {
    const endDate = moment();
    const startDate = moment().subtract(1, 'week');
    this.props.onDateChanged(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    this.setState({ active: 'week' });
  }

  render() {
    return (
      <div>
        <div className="button-group">
          <span className="button-group-label">Time Range</span>
          <button className={this.state.active === 'alltime' ? 'active' : 'inactive'} onClick={this.setAllTime}>All Time</button>
          <button className={this.state.active === 'year' ? 'active' : 'inactive'} onClick={this.setYear}>1 Year</button>
          <button className={this.state.active === 'halfyear' ? 'active' : 'inactive'} onClick={this.setHalfYear}>6 months</button>
          <button className={this.state.active === 'quarteryear' ? 'active' : 'inactive'} onClick={this.setQuarterYear}>3 months</button>
          <button className={this.state.active === 'month' ? 'active' : 'inactive'} onClick={this.setMonth}>1 Month</button>
          <button className={this.state.active === 'week' ? 'active' : 'inactive'} onClick={this.setWeek}>1 Week</button>
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}
