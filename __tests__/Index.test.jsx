jest.dontMock('../client/components/Index/Index.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

var Index = require('../client/components/Index/Index.jsx').default;

describe('IndexComponent', () => {

  it('should render', () => {
    var componentInstance = TestUtils.renderIntoDocument(<Index />);
    var indexItems = TestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'h1');

    expect(indexItems).not.toBeNull();
  });

});
