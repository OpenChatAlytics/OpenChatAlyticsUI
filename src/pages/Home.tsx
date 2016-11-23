import * as React from 'react';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Rooms from './components/rooms';
import Users from './components/users';
import './home.scss';

export default class extends React.Component<{}, {}> {

  public render() {
    return (
      <div>
        <Navbar />
        <Banner />
        <Users />
        <Rooms />
      </div>
    );
  }
}