import * as React from 'react';
import { shallow } from 'enzyme';
import { Home } from 'src/pages/Home';
import { expect } from 'chai';
import test from 'ava';

test('it should render', (t) => {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).to.eq(1);
});