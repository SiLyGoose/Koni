const { Client, Intents } = require("discord.js");

module.exports = class extends Client {
	constructor(config) {
		super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
		this.config = config;
		console.log(`Nodejs initialized on ${process.version}`);
	}
};
