jest.dontMock('../client/components/NotFound/NotFound.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const NotFound = require('../client/components/NotFound/NotFound.jsx').default;

describe('NotFoundComponent', () => {

  it('should render', () => {
    var instance = TestUtils.renderIntoDocument(<NotFound />);

    expect(instance.refs.title.textContent).toEqual('404. Not found.');
  });

});
