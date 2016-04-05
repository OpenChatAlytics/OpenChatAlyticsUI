jest.disableAutomock();
jest.mock('../client/stores/MainStore.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('IndexComponent', () => {
  
  beforeEach(() => {
    const MockMainStore = require('../client/stores/MainStore.js');
    MockMainStore.getState.mockImplementation(() => {
      return { locations: [] }
    });
  });

  it('should render', () => {
    var Index = require('../client/components/Index/Index.jsx').default;
    var componentInstance = TestUtils.renderIntoDocument(<Index />);
    var indexItems = TestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'ul');

    expect(indexItems).not.toBeNull();
  });

});
