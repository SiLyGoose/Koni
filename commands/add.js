module.exports = {
	description: "Adds courses to user schedule",
	stringOptions: {
		options: [
			{ name: "name", description: "Course Name", required: true },
			{
				name: "days",
				description: "Separated by hyphen",
				required: true,
			},
			{ name: "timestart", description: "x:xx", required: true },
			{ name: "timeend", description: "x:xx", required: true },
			{ name: "link", description: "Link/id", required: true },
			{
				name: "password",
				description: "Password (? if missing)",
				required: true,
			},
			{ name: "canvas", description: "Canvas link", required: true },
			{
				name: "extra",
				description: "Extra links (? if missing)",
				required: true,
			},
		],
	},
	async execute(interaction) {
		let { _hoistedOptions } = interaction.options,
			course,
			temp,
			id = [],
			user = await interaction.client.checkUser(interaction.user),
			courses = user.courses || [],
			registered;
		// let collector;

		// if (responseSplit.length < 7) {
		// 	temp = await interaction.client.sendMessageChannel(
		// 		"**Some fields for this course is __missing__. Please provide the necessary information.**",
		// 		interaction.channel
		// 	);
		// 	id.push(temp.id);

		// 	async function* fillForm(index) {
		// 		while (index < fields.length) {
		// 			temp = await interaction.client.sendMessageChannel(
		// 				`Course ${fields[index]}?`,
		// 				interaction.channel
		// 			);
		// 			id.push(temp.id);
		// 			collector = interaction.client.Discord.MessageCollector(
		// 				interaction.channel,
		// 				{
		// 					filter: (m) => m.author.id === interaction.user.id,
		// 					time: 10000,
		// 					maxProcessed: 1,
		// 				}
		// 			);

		// 			collector.on("collect", ({ content, id }) => {
		// 				console.log(content);
		// 				responseSplit.push(content);
		// 				id.push(id);
		// 			});

		// 			collector.on("end", (collection, reason) => {
		// 				console.log(collection, reason);
		// 			});

		// 			yield index++;
		// 		}
		// 	}

		// 	const iterator = fillForm(fields.length - responseSplit.length - 1);
		// 	while (true) {
		// 		console.log(iterator.next().value);
		// 	}
		// }

		// course = new Course(
		// 	_hoistedOptions[0].value,
		// 	_hoistedOptions[1].value,
		// 	_hoistedOptions[2].value,
		// 	_hoistedOptions[3].value,
		// 	_hoistedOptions[4].value,
		// 	_hoistedOptions[5].value,
		// 	_hoistedOptions[6].value
		// );

		course = {};
		for (let i = 0; i < _hoistedOptions.length; i++) {
			let { name, value } = _hoistedOptions[i];
			if (name === "link" && !value.startsWith("https://cpp.zoom.us/j/")) {
				value = "https://cpp.zoom.us/j/" + value.replace(/\s+/g, "");
			}
			course[name] = value === "?" ? "None" : value;
		}

		for (let i = 0; i < courses.length; i++) {
			if (courses[i].name === course.name) {
				registered = { course, i };
				break;
			}
		}

		if (registered) {
			temp = await interaction.client.sendReplyMessageChannel(
				`You have already registered ${registered.name}! To change existing course, use /change`
			);
			id.push(temp.id);
			collector = interaction.client.Discord.MessageCollector(interaction.channel, {
				filter: (m) => m.author.id === interaction.user.id,
				time: 10000,
				maxProcessed: 1,
			});

			collector.on("collect", (m) => {
				if (m.content.toLowerCase().startsWith("continue")) {
					id.push(m.id);
					return;
				}
			});

			collector.on("end", (collected, reason) => {
				console.log(collected, reason);
			});
		}

		if (registered) {
			courses[registered?.i] = registered?.course;
		} else courses.push(course);

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

		await interaction.client.updateUser(interaction.user, {
			courses,
		});
		return interaction.client.sendMessageChannel(
			`**✅ Successfully added ${course.name}!**`,
			interaction.channel
		);
	},
};
