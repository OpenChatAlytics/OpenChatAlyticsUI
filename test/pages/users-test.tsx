// stub out matchMedia for tests needed by enquire.js
declare var window;
window.matchMedia = window.matchMedia || (() => {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
});

import * as React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import Users from 'src/pages/users';

test('it should render', (t) => {
    const wrapper = shallow(<Users />);
    t.is(wrapper.length, 1);
});