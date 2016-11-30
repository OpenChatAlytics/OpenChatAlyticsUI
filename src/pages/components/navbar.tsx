import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Icon, Affix } from 'antd';
import { State } from 'src/flux/reducers';
import { DatePicker } from 'antd';
import './navbar.scss';
import * as moment from 'moment';
import * as Actions from 'src/flux/actions';

const RangePicker = DatePicker.RangePicker;

// tslint:disable:object-literal-sort-keys
const ranges = {
  'Today': [moment(), moment()],
  'This Month': [moment().startOf('month'), moment()],
  'This Year': [moment().startOf('year'), moment()],
};
// tslint:enable:object-literal-sort-keys
const dateFormat = 'YYYY/MM/DD';

interface NavbarProps {
  path?: string;
  updateDateRange?: any;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
};

export class Navbar extends React.Component<NavbarProps, {}> {

  public componentWillMount = () => {
    const { startDate, endDate } = this.props;
    this.props.updateDateRange(startDate, endDate);
  }

  public render(): JSX.Element {
    const { path, startDate, endDate } = this.props;
    return (
      <Affix>
        <Menu
          selectedKeys={[path]}
          mode='horizontal'
          className='navbar'
          >
          <Menu.Item key='/'>
            <Link to='/' style={{ textTransform: 'uppercase' }}>Open Chatalytics</Link>
          </Menu.Item>
          <Menu.Item key='/users'>
            <Link to='/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key='/rooms'>
            <Link to='/rooms'>Rooms</Link>
          </Menu.Item>
          <Menu.Item key='/entities'>
            <Link to='/entities'>Entities</Link>
          </Menu.Item>
          <RangePicker
            defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)] as any}
            size='large'
            ranges={ranges as any}
            format={dateFormat}
            allowClear={false}
            onChange={this.handleDateChange} />
        </Menu>
      </Affix>
    );
  }

  private handleDateChange = (dates: [ any, any ]): void => {
    const [ start, end ] = dates as [moment.Moment, moment.Moment];
    this.props.updateDateRange(start, end);
  }
}

const mapStateToProps = (state: State, props: NavbarProps): NavbarProps => {
  return {
    endDate: state.dateRange.end || moment(),
    path: state.routing.locationBeforeTransitions.pathname,
    startDate: state.dateRange.start || moment().startOf('year'),
  };
};

const mapDispatchToProps = (dispatch): NavbarProps => {
  return {
    updateDateRange: (start: moment.Moment, end: moment.Moment) =>
      dispatch(Actions.updateDateRange(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);