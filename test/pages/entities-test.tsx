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
import Entities from 'src/pages/entities';

test('it should render', (t) => {
    const wrapper = shallow(<Entities />);
    t.is(wrapper.length, 1);
});