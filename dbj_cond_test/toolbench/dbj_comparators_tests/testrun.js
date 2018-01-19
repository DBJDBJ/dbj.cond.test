'use strict';

exports.run = function() {
  require('../../dbj.nanotest'); // dbj.nano
  require('dbj.cond.comparators'); // dbj.compare
  const fast_deep_eq = require('fast-deep-equal');
  const tests = require('./testlist');
  const assert = require('assert');

  // use the factory method on dbj comparators
  const comparator_to_test = dbj.compare.make('arr', fast_deep_eq);

  dbj.nano.group('dbj.compare.arr + fast-deep-equal', function() {
    tests.forEach(function(suite) {
      dbj.nano.group(suite.description, function() {
        suite.tests.forEach(function(test) {
          dbj.nano.test(test.description, function() {
            dbj.nano.msg('comparing ' + test.value1 + ' and ' + test.value2 + ' should return ' + test.equal);
            // using fast_deep_eq as secondary comparator
            const rezult = comparator_to_test(test.value1, test.value2);
            dbj.nano.msg('It has returned: ' + rezult);
            return (rezult === test.equal);
          });
        });
      });
    });
  });
};
