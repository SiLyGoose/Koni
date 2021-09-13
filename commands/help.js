const { readdirSync } = require("fs");
module.exports = {
	description: "Displays all interaction client commands",
	stringOptions: {
		options: [
			{ name: "command", description: "Command Name", required: false },
		],
	},
	async execute(interaction) {
		let commandList = "```ini\n";
		const commands = readdirSync(`./commands/`).filter((d) =>
			d.endsWith(".js")
		);

		const Embed = interaction.client.defaultEmbed
			.setAuthor(
				`${interaction.client.user.username} Help { Nodejs ${process.version} - Discordjs ${interaction.client.Discord.version} }`,
				interaction.client.user.displayAvatarURL({ size: 2048 })
			)
			.setFooter(
				`${
					interaction.client.user.username
				}©️ from 2020 - ${new Date().getFullYear()}`
			);
		(Embed.fields = []),
			(Embed.description = null),
			(Embed.thumbnail = null);

		if (!interaction.options._hoistedOptions.length) {
			for (let file of commands)
				commandList += `[»] ${file.substring(0, file.length - 3)}\n`;

			Embed.addField(`🔠 Commands`, `${commandList}\`\`\``).setThumbnail(
				interaction.client.user.displayAvatarURL({ size: 2048 })
			);
		} else {
			let args =
				interaction.options._hoistedOptions[0].value.split(/\s+/g);
			var command = interaction.client.commands.get(
				args[0].toLowerCase()
			);
			if (!command) {
				Embed.setTitle("Invalid Command!").setDescription(
					`Do \`${interaction.client.config.prefix}help\` for the entire list of commands.`
				);
			}
			Embed.setDescription(
				`\`\`\`ini\n[Command]: ${interaction.client.Util.capitalize(
					command.name
				)}\n${"[Description]: " + command.description ?? ""}\`\`\``
			);
		}
		return interaction.client.sendEmbedChannel(Embed, interaction.channel);
	},
};
