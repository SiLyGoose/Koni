const bot = new (require('./handlers/clientHandler.js'))(require('./config/config.js'));

["aliases", "commands"].forEach(x => bot[x] = new (require('discord.js')).Collection());
["commandHandler", "eventHandler", "functions"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(bot.config.token);
bot.mongoose = require('./handlers/mongoDB').init(bot);