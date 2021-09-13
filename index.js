const bot = new (require('./handlers/clientHandler.js'))(require('./config/config.js'));

["commands"].forEach(x => bot[x] = new (require('discord.js')).Collection());
["DiscordUtil"].forEach(x => require(`./util/${x}`)(bot));
["commandHandler", "eventHandler", "clientFunctions"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(bot.config.token);
bot.mongoose = require('./handlers/mongoDB').init(bot);