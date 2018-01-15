/*
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

if ("undefined" == typeof dbj) dbj = {};

module.exports = dbj.nano = {
        'padStart': String.prototype.padStart,
            'padEnd': String.prototype.padEnd
};