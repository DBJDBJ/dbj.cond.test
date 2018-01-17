const color = require("colors");
/*
inspired by
http://2ality.com/2015/11/string-padding.html
*/

function string_padding_ (context, fillString, left_fill = true ) {

    let str = String(context);
        if (str.length >= maxLength) {
            return str;
        }

    fillString = String(fillString);
    if (fillString.length === 0) {
        fillString = ' ';
    }

    let fillLen = maxLength - str.length;
    let timesToRepeat = Math.ceil(fillLen / fillString.length);
    let truncatedStringFiller = fillString
        .repeat(timesToRepeat)
        .slice(0, fillLen);
    return left_fill ? truncatedStringFiller + str : str + truncatedStringFiller ;
}

if ("function" != typeof String.prototype.padStart)
String.prototype.padStart =
    function (maxLength, fillString = ' ') {
        return string_padding_(this, fillString);
     };

if ("function" != typeof String.prototype.padEnd)
String.prototype.padEnd =
    function (maxLength, fillString = ' ') {
        return string_padding_(this, fillString, false);
    };

/*
*/
if ("undefined" == typeof dbj) dbj = {};

dbj.nano = {
    'padStart': function (context, maxlen, filler) { return context.padStart(maxlen, filler ); } ,
    'padEnd': function (context, maxlen, filler) { return context.padEnd(maxlen, filler); },
    'evil': function evalInContext(jscode, context) {
        return function () { return eval(jscode); }.call(context);
    },
    'test': function (prompt, cb) {

        this.msg = function (s_) {
            console.log(s_.padEnd(99).bold);
        }

        var retval = true;
        //console.log("\n");
        console.log(" ".padEnd(99));
        //console.log("\n");
        console.log((prompt + " |").padEnd(99,'-').bold.yellow);
        try {
            if (true == cb(this)) {
                console.info("OK".bold.green);
                retval = true;
            } else {
                console.error("FAILED".bold.red);
                retval = false;
            }
        } catch (x) {
            console.error(("Exception: " + x.message).padEnd(99).bold.red);
            retval = false;
        }
        console.log(" ".padEnd(99));
        return retval;
    }
};

module.exports = dbj.nano;