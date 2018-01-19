/*
Copyright 2018 dbj.org

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
'use strict'
/**
 *  test shallow aka simplex comparators with dbj cond
 */
require("../../dbj.nanotest"); // defines dbj.nano
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

function test_this_comparator(required_rezult, expression, compfun ) {

    if (!!compfun) dbj.cond.comparator = compfun;
    const prompt = expression + ", should return: >" + required_rezult + "<";

    dbj.nano.test(prompt, function (n) {
        var retval = eval(expression);
        n.msg("Returned: >" + retval + "<");
        return (
            retval == required_rezult
        );
    });

    if (!!compfun) dbj.cond.comparator = dbj.compare.standard; // switch back
}

module.exports.run = function () {
    dbj.nano.group('dbj.cond simple tests', function (n) {

        n.msg("using standard simple comparator: " + dbj.cond.comparator );
        test_this_comparator("input found",
            'dbj.cond("input", "one", "found one", "input", "input found", "fall through")');

        test_this_comparator("fall through",
            'dbj.cond("input", "one", "found one", "two", "input found", "fall through")');

        const neq = function (a, b) { return a !== b;};
        n.msg("switching to user defined simple comparator: " + neq);

        test_this_comparator("found one",
            'dbj.cond("input", "one", "found one", "input", "input found", "fall through")'
        , neq );

        test_this_comparator("fall through",
            'dbj.cond("input", "input", "found one", "input", "input found", "fall through")'
            , neq);

        n.msg("done with dbj.cond simple tests " + neq);
        return true;
    });
}
