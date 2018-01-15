/**
 *  test dbj complex comparators with cond
    MIT (c) 2018 dbj.org
 */
const test = require('tape');
const colors = require('colors');
const dbj = require('dbj.cond');
const dbj_comparators = require('./node_modules/dbj.cond/dbj.cond.comparators.js');
const nanotest = require('./nanotest.js');
nanotest.context = this;

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
var run = function () {
    /*
    function nanotest(expression, required_rezult) {
    
        function evalInContext(js, context) {
            //# Return the results of the in-line anonymous function we .call with the passed context
            return function () { return eval(js); }.call(context);
        }
    
        var rezult = null;
        try {
            rezult = evalInContext(expression, nanotest.context );
        } catch (x) {
            rezult = (x.message).red;
        }
        console.log("\n" + (expression).white);
        console.log("returned\t".cyan + rezult);
    }
    
    nanotest.context = module ;
    */
    test("dbj complex comparators", function (t) {
        var input = "A";
        const input_array = ["A", "B", "C"];
        const input_object = { "A": 1, "B": 2, "C": 3 };

        t.comment("".yellow);
        t.comment("Using " + dbj.cond.comparator);
        // standard cond uses standard comparator, that is  function (a, b) { return a === b; }
        nanotest.do(
            'dbj.cond( "A", "A", "A found", "B", "B found", "C", "C found", "Neither A, B or C found")'
        );

        // change the comparator
        dbj.cond.comparator = function my_own_unequaluty_comparator(a, b) { return a !== b; };
        t.comment("Using " + dbj.cond.comparator);
        // try again the same test
        nanotest.do(
            'dbj.cond( "A", "A", "A found", "B", "B found", "C", "C found", "Neither A, B or C found")'
        );

        t.comment("".yellow);
    });

};
module.exports = { "run": run }; 
