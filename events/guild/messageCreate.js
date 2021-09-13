module.exports = {
	name: "messageCreate",
	async execute(message) {
		if (message.author.bot) return;
		if (message.channel.type === "dm") {
			let random = Math.floor(Math.random() * 2);
			return message.author
				.send(random ? "<:nessacringe:757806405657952267>" : "<:ohBoy:712048274709938298>")
				.then((x) => {
					x.channel.recipient.send(
						random
							? `**Please use me in a designated server instead. ✌️**`
							: `**Use me in a designated server you filthy fkn mortal. <:HandsUp:591111022551760907>**`
					);
				});
		}
		// return message.author.send('**❌ Please use me in a designated server!**');
		const { prefix } = message.client.config;

		let { content } = message;
		let start_prefix = content.toLowerCase().startsWith(prefix)
			? prefix
			: `<@!${message.client.user.id}>`;

		if (content == `<@!${message.client.user.id}>`)
			return message.channel
				.send("https://tenor.com/view/anime-girl-wink-star-tease-gif-12188360")
				.then((x) => x.channel.send("**Use `k.help` for commands!**"));

		if (!content.startsWith(start_prefix) || content.toLowerCase() === prefix) return;

		let args = content.slice(start_prefix.length).trim().split(/\s+/g);
		let cmd = args.shift().toLowerCase();

		let commandfile = message.client.commands.get(cmd);
		if (commandfile) {
			let interaction = {
				user: message.author,
				client: message.client,
				options: { _hoistedOptions: args },
				channel: message.channel,
			};
			return commandfile.execute(interaction);
		} else return;
	},
};
