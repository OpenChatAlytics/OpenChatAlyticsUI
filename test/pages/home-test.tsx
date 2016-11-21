import * as React from 'react';
import { suite, test, slow, timeout, skip, only } from 'mocha-typescript';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Home } from '../../src/pages/Home';

@suite class HomeTest {
  @test 'it renders'() {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).to.eq(1);
  }
}