// stub out matchMedia for tests needed by enquire.js
declare var window;
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
    };
};

import * as React from 'react';
import { shallow } from 'enzyme';
import test from 'ava';
import Home from 'src/pages/home';

test('it should render', (t) => {
    const wrapper = shallow(<Home />);
    t.is(wrapper.length, 1);
});