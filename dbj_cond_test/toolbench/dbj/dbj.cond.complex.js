/*
Copyright 2018 dbj.org

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
'use strict';
/**
 *  test dbj complex comparators with cond
 */
require('../../dbj.nanotest'); // defines dbj.nano
require('dbj.cond'); // defines dbj.cond
require('dbj.cond.comparators'); // defines dbj.comparator
const util = require('util');

/**
 * At this point we have dbj object
 * That contains :
 *    core          -- object -- dbj core lib
 *    cond          -- function
 *    comparator    -- swappable comparators for dbj.cond
 *                  -- note: there are many comparators available on npm
 *                     'deep-equal' and the rest
 *                     jQuery qUnit contains few, etc.
 */

function test_this_comparator(compfun, required_rezult, expression) {

  dbj.cond.comparator = compfun;
  const prompt = expression + ', should return: >' + required_rezult + '<';

  dbj.nano.test(prompt, function(n) {
    var retval = eval(expression);
    n.msg('Returned: >' + retval + '<');
    return (
      retval == required_rezult
    );
  });

  dbj.cond.comparator = dbj.compare.standard; // switch back
}

module.exports.run = function() {

  dbj.nano.group("dbj.cond using 'deep-equal' comparator", function(n) {

    const deep_qual = require('deep-equal');

    test_this_comparator(deep_qual,
      'Found!',
      'dbj.cond([1, 2], [3,2], false, [1,2], "Found!", "None found")'
    );
    return true;

  });

  dbj.nano.group("dbj.cond using 'fast-deep-equal' comparator", function(n) {

    const deep_qual = require('fast-deep-equal');

    test_this_comparator(deep_qual,
      'Found!',
      'dbj.cond([1, 2], [3,2], false, [1,2], "Found!", "None found")'
    );
    return true;

  });

  dbj.nano.group('dbj.cond using dbj cond arr comparator + fast-deep-equal as secondary comparator', function(n) {

    const deep_equal = require('fast-deep-equal');
    dbj.cond.secondary_comparator = deep_equal;

    test_this_comparator(dbj.compare.arr,
      'Found!',
      'dbj.cond([1, 2], [3,2], false, [1,2], "Found!", "None found")'
    );
    return true;
  });

  dbj.nano.group('dbj.cond using dbj cond multi comparator + fast-deep-equal as secondary comparator', function(n) {

    const deep_equal = require('fast-deep-equal');
    dbj.cond.secondary_comparator = deep_equal;

    test_this_comparator(dbj.compare.multi,
      'Found!',
      'dbj.cond([1, 2], [3,2], false, 2, "Found!", "None found")'
    );

    test_this_comparator(dbj.compare.multi,
      'Found!',
      'dbj.cond([1, 2], [3,2], false, ["2D",[1,2]], "Found!", "None found")'
    );

    test_this_comparator(dbj.compare.multi,
      'Found!',
      'dbj.cond(["2D",[1, 2]], [3,2], false, [1,2], "Found!", "None found")'
    );

    test_this_comparator(dbj.compare.multi,
      'Found!',
      'dbj.cond([{1:2},{3:4}], {2:3}, false, {3:4}, "Found!", "None found")'
    );

    return true;

  });


};
