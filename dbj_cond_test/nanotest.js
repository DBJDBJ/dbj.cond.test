'use strict';
const assert = require('assert');
const colors = require('colors');
const test = require('tape');
const pad = require('pad');

function nanotest(context, expression, required_rezult) {

    function evalInContext(js, context) {
        //# Return the results of the in-line anonymous function we .call with the passed context
        return function () { return eval(js); }.call(context);
    }

    const prompt = pad(expression + ", " + "required rezult: " + required_rezult, 100).bgBlue;
    test(
        prompt ,
     function (t) {
        t.plan(1);
        try {
            t.comment("");
            t.deepEqual(required_rezult, evalInContext(expression, context));
        } catch (x) {
            var rezult = ("Exception\t" + x.message).red;
            t.comment(rezult);
        }
        t.end();
        t.comment("");
    });
}


module.exports = {
    'do': nanotest
};