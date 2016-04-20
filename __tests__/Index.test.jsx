jest.disableAutomock();
jest.mock('../client/stores/MainStore.js');
jest.mock('../client/images/logo.png');
jest.mock('../client/images/bg2.jpg');

jest.mock('../client/sources/MainSource.js');
jest.mock('../client/actions/MainActions.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const MockMainStore = require('../client/stores/MainStore.js');
var Index = require('../client/components/Index/Index.jsx').default;

describe('IndexComponent', () => {
  
  beforeEach(() => {
    MockMainStore.getState.mockImplementation(() => {
      return { locations: [] }
    });
  });

  it('should render', () => {
    
    var componentInstance = TestUtils.renderIntoDocument(<Index />);
    var indexItems = TestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'ul');

    expect(indexItems).not.toBeNull();
  });

});
