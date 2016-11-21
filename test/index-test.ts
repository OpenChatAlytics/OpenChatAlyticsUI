// tslint:disable-next-line:no-reference
/// <reference path="../typings/index.d.ts"/>

import { suite, test, slow, timeout, skip, only } from 'mocha-typescript';
import { expect } from 'chai';

@suite class Hello {
    @test 'world'() {
        expect('hello').to.not.eq('world');
    }
}