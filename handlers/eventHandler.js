const { readdirSync } = require("fs");

module.exports = (bot) => {
	const load = (dirs) => {
		const events = readdirSync(`./events/${dirs}/`).filter((d) => d.endsWith(".js"));
		for (let file of events) {
			const evt = require(`../events/${dirs}/${file}`);
			if (evt.once) {
				bot.once(evt.name, (...args) => evt.execute(...args));
			} else {
				bot.on(evt.name, (...args) => evt.execute(...args));
			}
		}
	};
	["client", "guild"].forEach((x) => load(x));
};
