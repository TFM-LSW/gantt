importScripts(
    "node_modules/moment/min/moment.min.js"
);


function get_dates_to_draw(data) {
    let last_date = null;
    const dates = data.dates.map((date, i) => {
        const d = get_date_info(date, last_date, i, data.config);
        last_date = date;
        return d;
    });
    return dates;
}

function get_date_info(date, last_date, i, config) {
    if (!last_date) {
        last_date = date.clone().add(1, 'year').endOf('year');
    }
    const date_text = {
        'Minute_lower': date.format('mm\''),
        'Hour Sixth_lower': date.format('mm\''),
        'Hour Half_lower': date.format('mm\''),
        'Hour_lower': date.format('HH'),
        'Quarter Day_lower': date.format('HH'),
        'Half Day_lower': date.format('HH'),
        'Day_lower': date.date() !== last_date.date() ? date.format('D') : '',
        'Week_lower': date.month() !== last_date.month() ?
            date.format('D MMM') : date.format('D'),
        'Month_lower': date.format('MMMM'),
        'Minute_upper': date.minute() !== last_date.minute() ? date.format('mm') : '',
        'Hour Sixth_upper': date.hour() !== last_date.hour() ? date.format('HH') : '',
        'Hour Half_upper': date.hour() !== last_date.hour() ? date.format('HH') : '',
        'Hour_upper': date.date() !== last_date.date() ? date.format('D MMM') : '',
        'Quarter Day_upper': date.date() !== last_date.date() ? date.format('D MMM') : '',
        'Half Day_upper': date.date() !== last_date.date() ?
            date.month() !== last_date.month() ?
                date.format('D MMM') : date.format('D') : '',
        'Day_upper': date.month() !== last_date.month() ? date.format('MMMM') : '',
        'Week_upper': date.month() !== last_date.month() ? date.format('MMMM') : '',
        'Month_upper': date.year() !== last_date.year() ? date.format('YYYY') : ''
    };

    const base_pos = {
        x: i * config.column_width,
        lower_y: config.header_height,
        upper_y: config.header_height - 25
    };

    const x_pos = {
        'Minute_lower': 0, // (config.column_width * 1440) / 2,
        'Minute_upper': 0,
        'Hour Sixth_lower': 0, // (config.column_width * 24) / 2,
        'Hour Sixth_upper': 0, // (config.column_width * 24) / 2,
        'Hour Half_lower': 0, // (config.column_width * 24) / 2,
        'Hour Half_upper': 0, // (config.column_width * 24) / 2,
        'Hour_lower': 0, // (config.column_width * 24) / 2,
        'Hour_upper': 0,
        'Quarter Day_lower': 0, // (config.column_width * 4) / 2,
        'Quarter Day_upper': 0,
        'Half Day_lower': 0, // (config.column_width * 2) / 2,
        'Half Day_upper': 0,
        'Day_lower': 0,// config.column_width / 2,
        'Day_upper': 0, // (config.column_width * 30) / 2,
        'Week_lower': 0,
        'Week_upper': 0, // (config.column_width * 4) / 2,
        'Month_lower': 0, // config.column_width / 2,
        'Month_upper': 0 // (config.column_width * 12) / 2
    };
    return {
        upper_text: date_text[`${config.view_mode}_upper`],
        lower_text: date_text[`${config.view_mode}_lower`],
        upper_x: base_pos.x + x_pos[`${config.view_mode}_upper`],
        upper_y: base_pos.upper_y,
        lower_x: base_pos.x + x_pos[`${config.view_mode}_lower`],
        lower_y: base_pos.lower_y
    };
}


self.addEventListener('message', function (e) {
    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.{0,1}\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    var parseSaved;
    function parseWithMoment(json, next) {
        var parse = parseSaved ? parseSaved : JSON.parse;

        return parse(json, function (key, value) {
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
    const sData = parseWithMoment(e.data);

    let dateArr = [];
    for (let date of get_dates_to_draw(sData)) {
        // console.log(date.toString());
        dateArr.push(date);
    }
    self.postMessage(JSON.stringify(dateArr));
}, false);