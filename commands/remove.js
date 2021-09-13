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
			drop = _hoistedOptions.toLowerCase(),
			user = await interaction.client.checkUser(interaction.user),
			courses = user.courses || [];

		if (!courses.length)
			return interaction.client.sendReplyMessageChannel(
				"You have no registered courses! To add one, use /add"
			);

		if (drop === "all") {
			courses = [];
		} else {
			for (let i = 0; i < courses.length; i++) {
				if (courses[i].name.toLowerCase() === drop) {
					courses.splice(i, 1);
					break;
				}
			}
		}
		await interaction.client.updateUser(interaction.user, courses);
		return interaction.client.sendMessageChannel(
			`✅ **Successfully dropped ${drop === "all" ? "all courses" : drop}!**`,
			interaction.channel
		);
	},
};
