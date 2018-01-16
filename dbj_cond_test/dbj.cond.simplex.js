'use strict'
/**
 *  test dbj simplex comparators with cond
    MIT (c) 2018 dbj.org
 */
const nano = require("./dbj.nanotest") ;
const dbj = require('dbj.cond');
// const dbj_comparators = require('./node_modules/dbj.cond/dbj.cond.comparators');

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

/*
Comparator              Description
----------------------------------------------------------------------------------------------
deepEqual()	            Checks if two values are equal
deepStrictEqual()	    Checks if two values are equal, using the strict equal operator (===)
equal()	                Checks if two values are equal, using the equal operator (==)
notDeepEqual()	        Checks if two values are not equal
notDeepStrictEqual()	Checks if two values are not equal, using the strict not equal operator (!==)
notEqual()	            Checks if two values are not equal, using the not equal operator (!=)
notStrictEqual()	    Checks if two values are not equal, using the strict not equal operator (!==)
strictEqual()	        Checks if two values are equal, using the strict equal operator (===)
*/

module.exports.run = function () {
    dbj.nano.test('dbj.cond simple tests', function (n) {

        dbj.nano.test('should return "input found"', function () {
            n.msg('Checking dbj.cond("input", "one", "found one", "input", "input found", "fall through")');
            return (
            dbj.cond("input", "one", "found one", "input", "input found", "fall through")
                ==
                "input found"
                );
        });

        dbj.nano.test('should return "fall through"', function () {
            n.msg('Checking dbj.cond("input", "one", "found one", "two", "input found", "fall through")');
            return (
            dbj.cond("input", "one", "found one", "two", "input found", "fall through")
                ==
                "fall through"
                ) ;
        });
        return true;
    });
}
