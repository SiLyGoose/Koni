const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: String,
	courses: Array,
	todaySchedule: Map,
	timeCheckAlarm: Array
});

module.exports = mongoose.model("User", userSchema);
