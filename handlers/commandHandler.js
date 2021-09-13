const { readdirSync } = require("fs");

module.exports = (bot) => {
	const dir = "commands";
	const commands = readdirSync(`./${dir}/`).filter((d) => d.endsWith(".js"));
	for (let file of commands) {
		let pull = require(`../${dir}/${file}`);

		file = file.slice(0, file.length - 3);
		pull.name = file;

		bot.commands.set(file, pull);
	}
};
