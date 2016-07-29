(function(window) {
	'use strict';
	/**
	 **	时间处理
	 **/
	function MyDate(options) {
		var _this = this,
			ops = options || {},
			formartIndex;
		_this.separator = '-';
		_this.formart = '';


		for (var key in ops) {
			this[key] = ops[key];
		}
		formartIndex = this.__inArray(_this.formart.toLowerCase(), _this.__dateFormat);
		if (formartIndex !== -1) {
			_this.separator = _this.__dateFormat[formartIndex].slice(4, 5);
		}
	}

	MyDate.prototype = {
		__inArray: function(item, arr) {
			var index = -1,
				arrs = arr || [];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					index = i;
					break;
				}
			}
			return index;
		},
		//获取当前时间戳
		now: function(date) {
			return date ? (new Date(this.__compatibleFormat(date))).getTime() : (new Date()).getTime();
		},

		__autoComplete: function(val) {
			return val < 10 ? '0' + val : val;
		},

		__dateFormat: ['yyyy-mm-dd', 'yyyy/mm/dd', 'yyyy.mm.dd'],

		formart: function(date) {
			return date;
		},

		__compatibleFormat: function(date) {
			return (date || '').replace(/-|\./g, '/');
		},

		//计算时间差-天数
		diffDate: function(startDate, endDate) {
			return Math.floor(
				(
					(
						new Date(this.__compatibleFormat(endDate)) -
						new Date(this.__compatibleFormat(startDate))
					) /
					(1000 * 60 * 60 * 24)
				)
			);
		},

		//是否润年
		isLeapYear: function(year) {
			return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
		},

		//获取当前时间
		getDateString: function(newDate) {
			var d = newDate ? new Date(newDate) : new Date(),
				result = [];
			result.push(d.getFullYear());
			result.push(this.__autoComplete(d.getMonth() + 1));
			result.push(this.__autoComplete(d.getDate()));
			result.push(this.__autoComplete(d.getHours()));
			result.push(this.__autoComplete(d.getMinutes()));
			result.push(this.__autoComplete(d.getSeconds()));
			return result.join(this.separator);
		},

		//创建新时间
		createDate: function(options) {
			var ops = options || {},
				date = new Date(),
				y = date.getFullYear(),
				m = date.getMonth(),
				d = date.getDate();

			if (undefined !== ops.year) {
				date.setYear(y + ops.year);
			}
			if (undefined !== ops.month) {
				date.setMonth(m + ops.month);
				d = date.getDate();
			}
			if (undefined !== ops.date) {
				date.setDate(d + ops.date);
			}
			return this.getDateString(date);
		},
		countdown: function(dateString) {
			var result = {},
				nowDate = this.now(),
				endDate = this.now(dateString),
				t = endDate - nowDate;
			var d = Math.floor(t / 1000 / 60 / 60 / 24);
			var h = Math.floor(t / 1000 / 60 / 60 % 24);
			var m = Math.floor(t / 1000 / 60 % 60);
			var s = Math.floor(t / 1000 % 60);


			result = {
				date: d,
				hours: h,
				minute: m,
				second: s
			};
			return result;
		}
	};
	MyDate.prototype.constructor = MyDate;

	window.MyDate = MyDate;
})(this);


var date = new MyDate({
	formart: 'yyyy.mm.dd'
});

//console.log(date.now());
//console.log(date.getDateString());
// console.log(date.createDate({
// 	year: -1,
// 	month: -1,
// 	date: -1
// }));
//console.log(date.getDateString());
//console.log(date.getDateString('2016-07-21 12:10:00'));
var result = document.getElementById('result');
setInterval(function() {
	//console.clear();
	var rs = date.countdown('2016-07-21 11:47:00');
	//console.log(rs);
	result.innerHTML = rs.date + '天 ' + rs.hours + '时' + rs.minute + '分' + rs.second + '秒';
	//console.log(date.countdown('2016-07-21 12:00:00'));
}, 100);
//console.log(date.countdown('2016-07-21 12:00:00'));
//console.log(date.now());
//console.log(date.now('2016-07-21 11:04:00'));