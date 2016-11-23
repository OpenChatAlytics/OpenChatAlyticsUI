import * as React from 'react';
import { shallow } from 'enzyme';
import Home from 'src/pages/Home';
import test from 'ava';

test('it should render', (t) => {
    const wrapper = shallow(<Home />);
    t.is(wrapper.length, 1);
});