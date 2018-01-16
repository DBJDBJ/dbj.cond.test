'use strict'
/**
 *  test dbj complex comparators with cond
    MIT (c) 2018 dbj.org
 */
const nano = require("./dbj.nanotest");
const dbj = require('dbj.cond');
const dbj_comparators = require('dbj.cond.comparators');

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

const input_value = "A";
const input_array = ["A", "B", "C"];
const input_object = { "A": 1, "B": 2, "C": 3 };

function test_this_comparator(compfun, required_rezult, expression) {

    dbj.cond.comparator = compfun;
    const prompt = expression + ", should return: >" + required_rezult + "<";

    dbj.nano.test(prompt, function (n) {
        var retval = eval(expression);
            n.msg("Returned: >" + retval + "<");
        return (
            retval == required_rezult
        );
    });

    dbj.cond.comparator = dbj.compare.standard; // switch back
}

module.exports.run = function () {

    dbj.nano.test("dbj.cond using 'deep-equal' comparator", function (n) {

        const deep_qual = require("deep-equal");
        
        test_this_comparator(deep_qual,
            "Found!",
            'dbj.cond([1, 2], [3,2], false, [1,2], "Found!", "None found")'
        );
        return true;

    });

    dbj.nano.test("dbj.cond using 'fast-deep-equal' comparator", function (n) {

        const deep_qual = require("fast-deep-equal");

        test_this_comparator(deep_qual,
            "Found!",
            'dbj.cond([1, 2], [3,2], false, [1,2], "Found!", "None found")'
        );
        return true;

    });

    dbj.nano.test("dbj.cond using dbj cond arr comparator with fast-deep-equal as secondary comparator", function (n) {

        const deep_equal = require("fast-deep-equal");
        dbj.cond.secondary_comparator = deep_equal;

        test_this_comparator(dbj.compare.arr,
            "Found!",
            'dbj.cond([1, 2], [3,2], false, [1,2], "Found!", "None found")'
        );
        return true;
    });

    dbj.nano.test("dbj.cond using dbj cond multi comparator with fast-deep-equal as secondary comparator", function (n) {

        const deep_equal = require("fast-deep-equal");
        dbj.cond.secondary_comparator = deep_equal;

        test_this_comparator(dbj.compare.multi,
            "Found!",
            'dbj.cond([1, 2], [3,2], false, 2, "Found!", "None found")'
        );

        test_this_comparator(dbj.compare.multi,
            "Found!",
            'dbj.cond([1, 2], [3,2], false, ["2D",[1,2]], "Found!", "None found")'
        );

        test_this_comparator(dbj.compare.multi,
            "Found!",
            'dbj.cond(["2D",[1, 2]], [3,2], false, [1,2], "Found!", "None found")'
        );

        return true;

    });


}