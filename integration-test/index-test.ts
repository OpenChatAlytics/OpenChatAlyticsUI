import test from 'ava';
import * as webdriverio from 'webdriverio';

// holds the absolute path of the project, defined by webpack
declare var __dirname__: string;

let client = webdriverio.remote({
    desiredCapabilities: { browserName: 'chrome' }
});

test.before(async t => {
    await client.init()
        .url('file://' + __dirname__ + '/dist/index.html')
        .waitForVisible('h1');
});

test.after.always(async t => {
    await client.end();
});

test('has a banner with appropriate text', async t => {
    const text = await client.getText('h1');
    t.is(text[0], 'Open Chatalytics');
});