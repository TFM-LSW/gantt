"use strict";
// var moment = require('moment');

var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.{0,1}\d*))(?:Z|(\+|-)([\d|:]*))?$/;

var parseSaved;

/**
 * Wrapper around the JSON.parse() function that adds a date
 * filtering extension. Returns all dates as real JavaScript dates.
 * @param {String} json
 * @param {Function} next use when you want to do some other parsing as well
 * @returns {*}
 */
function parseWithMoment(json, next) {
    /// <summary>
    ///
    /// </summary>
    /// <param name="json" type="string">JSON to be parsed</param>
    /// <returns type="any">parsed value or object</returns>
    var parse = parseSaved ? parseSaved : JSON.parse;

    return parse(json, function(key, value) {
        var parsedValue = value;
        if (typeof value === 'string') {
            var a = reISO.exec(value);
            if (a) {
                parsedValue = moment(value);
            }
        }
        if (next !== undefined) {
            return next(key, parsedValue);
        } else {
            return parsedValue;
        }
    });
}

/**
 * Globally enables JSON date parsing for JSON.parse(). Replaces the default JSON.parse() method and adds
 * @param {boolean} enable will reset default when called with false
 */
parseWithMoment.overrideDefault = function(enable) {

    // if any parameter is passed reset
    if (enable === false) {
        if (parseSaved) {
            JSON.parse = parseSaved;
            parseSaved = null;
        }
    } else {
        if (!parseSaved) {
            parseSaved = JSON.parse;
            JSON.parse = parseWithMoment;
        }
    }
};

module.exports = parseWithMoment;