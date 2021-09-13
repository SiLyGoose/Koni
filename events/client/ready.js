const moment = require("moment");
const tz = require("moment-timezone");
const { User } = require("../../models/app");
module.exports = {
	name: "ready",
	once: true,
	async execute(bot) {
		bot.Util.catch(
			bot.user.setPresence({
				activities: [
					{
						name: `Zoom Lectures`,
						type: "WATCHING",
					},
				],
				status: "idle",
			})
		);

		console.log(`${bot.user.username} presence secured!`);

		let { todaySchedule = new Map(), timeCheckAlarm = [] } = await bot.checkUser(bot.user),
			timeCheckClose,
			alert = false, reset = false;

		setInterval(async() => {
			let now = moment().tz("America/Los_Angeles"),
				today = now.format("e"),
				time = now.format("H:mm:ss"),
				users;
			while (!users) {
				try {
					users = await User.find();
				} catch (e) {
					console.error(e);
				}
			}

			if (time === "0:00:00" || (parseInt(timeCheckAlarm[timeCheckAlarm.length - 1].split(":")[0]) < now.hours() && !reset)) {
				todaySchedule = new Map();
				timeCheckAlarm = [];
				for (const { courses, userID } of users) {
					if (courses.length) {
						let todayCourses = [],
							timeStart;
						for (let i = 0; i < courses.length; i++) {
							let course = courses[i];
							if (bot.Util.convertNumToArray(course.days).some((x) => x === +today)) {
								todayCourses.push(course);
								timeStart = moment(course.timestart, "H:mm")
									.tz("America/Los_Angeles")
									.subtract(5, "minutes")
									.format("H:mm:ss");
								timeCheckAlarm.push(timeStart);
							}
						}
						todaySchedule.set(`${userID}//${timeStart}`, todayCourses);
					}
				}
				timeCheckAlarm = timeCheckAlarm.sort(function (a, b) {
					let aTime = +a.split(":")[0],
						bTime = +b.split(":")[0];
					return aTime > bTime ? 1 : -1;
				});
				await bot.updateUser(bot.user, { todaySchedule, timeCheckAlarm });
				reset = !reset;
			}

			if (
				moment(timeCheckAlarm[0], "H:mm").tz("America/Los_Angeles").fromNow() ===
				"in 4 minutes"
			)
				alert = !alert;

			if (
				now.format("H") === timeCheckAlarm[0]?.split(":")[0] &&
				moment(timeCheckAlarm[0], "H:mm").tz("America/Los_Angeles").fromNow() ===
					"in 5 minutes"
			) {
				const timeFilter = (x) => x === time;
				if (!alert && (timeCheckClose = timeCheckAlarm.find(timeFilter))) {
					let key;
					const iterator = todaySchedule.keys();
					while ((key = iterator.next().value)) {
						if (key.split("//")[1] === timeCheckClose) {
							const Embed = bot.defaultEmbed;
							(Embed.fields = []),
								(Embed.description = null),
								(Embed.thumbnail = null);

							let course = todaySchedule.get(key),
								days = bot.Util.convertNumToDays(course.days);
							let description = `**[${course.name.toUpperCase()} - ${days.join(
								""
							)}](${course.link})**\n`;
							if (course.password !== "None")
								description += `Password: ${course.password}\n`;

							if (course.extra !== "None") description += `Extra: ${course.extra}\n`;

							bot.channels.fetch("880946113786568754").then((channel) =>
								channel.send({
									embeds: [Embed.setDescription(description)],
								})
							);

							if (!timeCheckAlarm.shift()) reset = !reset;
							alert = !alert;
							break;
						}
					}
				}
			}
		}, 1000);
	},
};
