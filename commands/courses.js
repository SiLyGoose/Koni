module.exports = {
	description: "Displays user's course schedule",
	stringOptions: {
		options: [
			{
				name: "schedule",
				description: "Display courses in full schedule (can type anything)",
				required: false,
			},
		],
	},
	async execute(interaction) {
		let { courses } = (await interaction.client.checkUser(interaction.user)) || [],
			{ _hoistedOptions } = interaction.options,
			Embed = interaction.client.defaultEmbed;

		if (!courses.length) {
			return interaction.client.sendMessageChannel(
				"❌ **No classes added! To add a class, use `/add`**",
				interaction.channel
			);
		}
		(Embed.fields = []), (Embed.description = null), (Embed.thumbnail = null);

		let description = "",
			fullSchedule = {},
			weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		courses = courses.sort(function (a, b) {
			let aDays = a.days.split(/\s*-\s*/g)[0],
				bDays = b.days.split(/\s*-\s*/g)[0],
				aTime = a.timestart.split(/\s*:\s*/g)[0],
				bTime = b.timestart.split(/\s*:\s*/g)[0];
			if (aDays == bDays) {
				return +aTime > +bTime ? 1 : -1;
			} else {
				return aDays > bDays ? 1 : -1;
			}
		});

		for (let i = 0; i < courses.length; i++) {
			const course = courses[i];

			if (_hoistedOptions.length) {
				let days = interaction.client.Util.convertNumToArray(course.days);
				for (let j = 0; j < days.length; j++) {
					let daySchedule = fullSchedule[weekdays[days[j] - 1]] || [];
					daySchedule.push(course);
					fullSchedule[weekdays[days[j] - 1]] = daySchedule;
				}
				continue;
			}

			let days = interaction.client.Util.convertNumToDays(course.days);

			description += `**[${course.name.toUpperCase()} - ${days.join("")}](${
				course.link
			})**\n`;
			if (course.password !== "None") {
				description += `Password: ${course.password}\n`;
			}
			if (course.extra !== "None") {
				description += `Extra: ${course.extra}\n`;
			}
			if (i != courses.length - 1) description += "\n";
		}

		const humanify = function (stringTime) {
			let split = stringTime.split(/\s*:\s*/g);
			let meridiem = "am";
			if (split[0] > 12) {
				meridiem = "pm";
				split[0] = +split[0] - 12;
			}
			return `${split.join(":")} ${meridiem}`;
		};

		if (_hoistedOptions.length) {
			for (let i = 0; i < weekdays.length; i++) {
				for (const [key, value] of Object.entries(fullSchedule)) {
					if (key === weekdays[i]) {
						let dayCourseDescription = "";
						for (let i = 0; i < value.length; i++) {
							const { name, link, timestart, timeend } = value[i];
							dayCourseDescription += `[${name.toUpperCase()}](${link}) | ${humanify(
								timestart
							)} - ${humanify(timeend)}`;
							if (i !== value.length - 1) dayCourseDescription += "\n";
						}
						dayCourseName = `__**${key}**__`;
						Embed.addField(dayCourseName, dayCourseDescription);
					}
				}
			}
		} else Embed.setDescription(description);

		return interaction.client.sendEmbedChannel(
			Embed.setDescription(description),
			interaction.channel
		);
	},
};
