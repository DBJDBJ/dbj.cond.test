/**
 *  test dbj complex comparators with cond
    MIT (c) 2018 dbj.org
 */
const assert = require('assert');
const dbj = require('dbj.cond');
const dbj_comparators = require('../node_modules/dbj.cond/dbj.cond.comparators.js');

/**
 * At this point both dbj and dbj_comparators are equal
 * They contain :
 *    core          -- object -- dbj core lib
 *    cond          -- function
 *    comparator    -- swappable comparators for dbj.cond
 *                  -- note: there are many comparators available on npm
 *                     'deep-equal' and the rest
 *                     jQuery qUnit contains few, etc.
 */

describe("dbj complex comparators", function () {
        var input = "A";
        const input_array = ["A", "B", "C"];
        const input_object = { "A": 1, "B": 2, "C": 3 };

        describe("Using " + dbj.cond.comparator, function () {
        // standard cond uses standard comparator, that is  function (a, b) { return a === b; }
        it(
            'dbj.cond( "A", "A", "A found", "B", "B found", "C", "C found", "Neither A, B or C found")'
            , function () {
                assert.equal(dbj.cond("A", "A", "A found", "B", "B found", "C", "C found", "Neither A, B or C found"),"A found");
           });

        // change the comparator
        dbj.cond.comparator = function my_own_unequaluty_comparator(a, b) { return a !== b; };
        describe("Using " + dbj.cond.comparator, function () {
            // try again the same test
            it(
                'dbj.cond( "A", "A", "A found", "B", "B found", "C", "C found", "Neither A, B or C found")'
                , function () {
                    assert.equal(dbj.cond("A", "A", "A found", "B", "Not A", "C", "C found", "Neither A, B or C found"), "Not A");
                });
        });

        });
});

