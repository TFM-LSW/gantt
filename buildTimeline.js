/* self.addEventListener('message', function (e) {
    self.postMessage(e.data);
}, false); */

importScripts("node_modules/moment/min/moment.min.js");

self.addEventListener('message', function (e) {
    /* function get_dates_to_draw() {
		let last_date = null;
		const dates = self.dates.map((date, i) => {
			const d = get_date_info(date, last_date, i);
			last_date = date;
			return d;
		});
		return dates;
    } 
    
    function get_date_info(date, last_date, i) {
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
			x: i * self.config.column_width,
			lower_y: self.config.header_height,
			upper_y: self.config.header_height - 25
		};

		const x_pos = {
			'Minute_lower': 0, // (self.config.column_width * 1440) / 2,
			'Minute_upper': 0,
			'Hour Sixth_lower': 0, // (self.config.column_width * 24) / 2,
			'Hour Sixth_upper': 0, // (self.config.column_width * 24) / 2,
			'Hour Half_lower': 0, // (self.config.column_width * 24) / 2,
			'Hour Half_upper': 0, // (self.config.column_width * 24) / 2,
			'Hour_lower': 0, // (self.config.column_width * 24) / 2,
			'Hour_upper': 0,
			'Quarter Day_lower': 0, // (self.config.column_width * 4) / 2,
			'Quarter Day_upper': 0,
			'Half Day_lower': 0, // (self.config.column_width * 2) / 2,
			'Half Day_upper': 0,
			'Day_lower': 0,// self.config.column_width / 2,
			'Day_upper': 0, // (self.config.column_width * 30) / 2,
			'Week_lower': 0,
			'Week_upper': 0, // (self.config.column_width * 4) / 2,
			'Month_lower': 0, // self.config.column_width / 2,
			'Month_upper': 0 // (self.config.column_width * 12) / 2
		};
		return {
			upper_text: date_text[`${self.config.view_mode}_upper`],
			lower_text: date_text[`${self.config.view_mode}_lower`],
			upper_x: base_pos.x + x_pos[`${self.config.view_mode}_upper`],
			upper_y: base_pos.upper_y,
			lower_x: base_pos.x + x_pos[`${self.config.view_mode}_lower`],
			lower_y: base_pos.lower_y
		};
    }
    
    */
    self.postMessage(e.data);
}, false);