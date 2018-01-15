/**
 *  test assert comparators with cond
    MIT (c) 2018 dbj.org
 */
const assert = require('assert');
const dbj    = require('dbj.cond');

describe('String padding', function () {

    describe("String.prototype.padStart", function () {

        it ('"ABC".padStart(5,"-"), == "--ABC"', function () {
            assert.equal(
                "ABC".padStart(5, "-"), "--ABC"
            );
        });
    });

});
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
describe('dbj.cond simple tests', function () {

    describe('\ndbj.cond("input", "one", "found one", "input", "input found", "fall through")', function () {
        it('should return "input found"', function () {
            assert.equal(dbj.cond("input", "one", "found one", "input", "input found", "fall through"),
                "input found");
        });
    });

    describe('\ndbj.cond("input", "one", "found one", "two", "input found", "fall through")', function () {
        it('should return "fall through"', function () {
            assert.equal(dbj.cond("input", "one", "found one", "two", "input found", "fall through"),
                "fall through");
        });
    });

});