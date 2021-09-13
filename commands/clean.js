module.exports = {
	description: "Cleans all bot commands and remnants",
	async execute(interaction) {
		interaction.channel.messages.fetch({ limit: 100 }).then((x) => {
			const { prefix } = interaction.client.config;
			let botu = x.filter(
				(m) =>
					m.author.id === interaction.client.user.id ||
					m.content.toLowerCase().startsWith(prefix) ||
					m.content.startsWith(`<@!${interaction.client.user.id}>`)
			);

			if (!botu.size)
				return interaction.client.sendMessageChannel("**❌ No messages to clean!**", channel);

			for (let [key, value] of botu) {
				let { content, author: {id} } = value;
				let cmd;
				if (content.startsWith(prefix)) {
					cmd = content.split(/\s+/g)[0].slice(prefix.length).toLowerCase();
				}
				if (!interaction.client.commands.get(cmd) && !id === interaction.client.user.id) {
					botu.delete(key);
				}
			}

			interaction.channel.bulkDelete(botu, true);

			return interaction.client.sendMessage(
				{
					content: `**✅ Cleaned \`${botu.size}\` messages!**`,
					channel: interaction.channel,
				},
				2000
			);
		});
	},
};
