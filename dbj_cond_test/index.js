/*
Copyright 2018 dbj.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied.
See the License for the specific language governing permissions
and limitations under the License.
*/
'use strict';
/* */
require('./toolbench/dbj/dbj.cond.simplex').run();
dbj.cond.reset();
require('./toolbench/dbj/dbj.cond.complex').run();
dbj.cond.reset();
require('./toolbench/dbj_comparators_tests/testrun').run();
require('./toolbench/comparators_benchmark/index').run();
/* */
// eof
/*
the simplest use case

require('dbj.cond');
const assert = require("assert");
// switching to user defined comparator 
dbj.cond.comparator =
    function myComparator(a, b) { return a !== b; };
//
let R1 = dbj.cond("one", "two", "two !== one", "none found!");
assert(R1 === "two !== one");

// switching back to standard comparator
dbj.cond.comparator = function strict_eq(a, b) { return a === b; };
//
let R2 = dbj.cond("one", "one", "one === one", "none found!");
assert(R2 === "one === one");
*/