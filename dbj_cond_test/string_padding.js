'use strict'

const assert = require('assert');
/*
   is string padding available
 */
describe('String padding', function () {

    describe("String.prototype.padStart", function () {

        it('"ABC".padStart(5,"-"), == "--ABC"', function () {
            assert.equal(
                "ABC".padStart(5, "-"), "--ABC"
            );
        });
    });

    describe("String.prototype.padEnd", function () {

        it('"ABC".padEnd(5,"-"), == "ABC--"', function () {
            assert.equal(
                "ABC".padEnd(5, "-"), "ABC--"
            );
        });
    });

});