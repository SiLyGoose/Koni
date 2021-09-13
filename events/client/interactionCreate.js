const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "9" }).setToken(process.env.token);
const moment = require("moment");
const tz = require("moment-timezone");
module.exports = {
	name: "interactionCreate",
	execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(
			interaction.commandName
		);

		if (!command) return;

		try {
			

			const { id, token } = interaction;
			const json = {
				type: 5,
				data: {
					content: `${interaction.user.username} used ${
						interaction.commandName
					} (${moment()
						.tz("America/Los_Angeles")
						.format("h:mm a")})`,
				},
			};
			rest.post(Routes.interactionCallback(id, token), {
				body: json,
			});
			command.execute(interaction);
			return rest.delete(Routes.webhookMessage(interaction.client.user.id, token));
		} catch (error) {
			console.error(error);
			return interaction.reply({
				content: "There was an error executing this command!",
				ephemeral: true,
			});
		}
	},
};
