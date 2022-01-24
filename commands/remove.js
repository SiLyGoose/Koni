module.exports = {
	description: "Removes courses from user schedule",
	stringOptions: {
		options: [
			{
				name: "name",
				description: 'Course Name ("all" to drop all current courses)',
				required: true,
			},
		],
	},
	async execute(interaction) {
		let { _hoistedOptions } = interaction.options,
			user = await interaction.client.checkUser(interaction.user),
			courses = user.courses || [],
			drop = [];

		for (let i = 0; i < _hoistedOptions.length; i++) {
			drop[i] = _hoistedOptions[i].toLowerCase();
		}

		if (!courses.length)
			return interaction.client.sendReplyMessageChannel(
				"You have no registered courses! To add one, use /add"
			);

		if (drop[0] === "all") {
			courses = [];
		} else {
			for (let i = 0; i < courses.length; i++) {
				if (drop.find(x => x === courses[i].name.toLowerCase())) {
					courses.splice(i, 1);
					break;
				}
			}
		}
		await interaction.client.updateUser(interaction.user, { courses });
		return interaction.client.sendMessageChannel(
			`✅ **Successfully dropped ${drop[0] === "all" ? "all courses" : drop.join(", ").toUpperCase()}!**`,
			interaction.channel
		);
	},
};
