const { User } = require("../models/app"),
	mongoose = require("mongoose");
	
module.exports = (bot) => {
	bot.checkUser = async (member) => {
		let user = await User.findOne({
			userID: member.id || member,
		});
		if (user) return user;
		else return bot.createUser(member);
	};

	bot.createUser = async (member) => {
		let user = Object.assign(
			{ _id: mongoose.Types.ObjectId() },
			{ userID: member.id || member }
		);
		const newUser = new User(user);
		return newUser.save();
	};

	bot.updateUser = async (member, balance) => {
		let user = await bot.checkUser(member);
		if (typeof user !== "object") user = {};
		for (const key in balance) {
			if (user[key] !== balance[key]) user[key] = balance[key];
		}
		await user.updateOne(user);
		return user;
	};

	bot.clean = (text) => {
		return typeof text === "string"
			? text
					.replace(/` /g, "`" + String.fromCharCode(8203))
					.replace(/@/g, "@" + String.fromCharCode(8203))
			: text;
	};

	bot.objectEmpty = (obj) => {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	};
};
