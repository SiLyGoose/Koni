module.exports = {
	catch: function (exe) {
		try {
			exe;
		} catch (e) {
			console.error(e);
		}
	},
	capitalize: function (string, multiple = false) {
		let all = string.split(/\s+/g);
		for (let i = 0; i < all.length; i++) {
			if (i > 0 && !multiple) break;
			all[i] = all[i][0].toUpperCase() + all[i].substr(1).toLowerCase();
		}
		return all.join(" ");
	},
	checkAnyValueEqual: function (obj1, obj2) {
		for (const keys in obj1) {
			if (obj1[keys] === obj2[keys]) return true;
		}
		return false;
	},
	checkObjectEqual: function (obj1, obj2) {
		for (const keys in obj1) {
			if (obj1[keys] !== obj2[keys]) return false;
		}
		return true;
	},
	convertNumToDays: function (string) {
		const weekdays = ["m", "t", "w", "th", "f"];
		let days = this.convertNumToArray(string);
		for (let i = 0; i < days.length; i++) {
			days[i] = this.capitalize(weekdays[days[i] - 1]);
		}
		return days;
	},
	convertNumToArray: function (string) {
		let days = string.split(/\s*-\s*/g);
		return days.map(x => +x);
	},
};
