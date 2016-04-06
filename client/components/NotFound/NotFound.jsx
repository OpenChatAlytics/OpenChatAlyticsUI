import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <div id="content">
        <h2 ref="title">404. Not found.</h2>
        <p>
          <img src="http://i.imgur.com/ooWW6.gif" />
        </p>
        <p><Link to={`/`}>Go to index</Link></p>
      </div>
    );
  }
}

export default NotFound;
