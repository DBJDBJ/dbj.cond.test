'use strict';

require('../../dbj.nanotest'); // dbj.nano
require("dbj.cond.comparators"); // dbj.compare
const tests = require('./testlist');
const assert = require('assert');

const equal = dbj.compare.arr;


dbj.nano.group ('equal', function() {
  tests.forEach(function (suite) {
      dbj.nano.group(suite.description, function() {
      suite.tests.forEach(function (test) {
          dbj.nano.test(test.description, function() {
          assert.strictEqual(equal(test.value1, test.value2), test.equal);
        });
      });
    });
  });
});
