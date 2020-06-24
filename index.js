const bot = new (require('./handlers/clientHandler.js'))({config: './config/config.js'});

["aliases", "commands"].forEach(x => bot[x] = new (require('discord.js')).Collection());
["commandHandler", "eventHandler", "functions"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(require('./config/config.js').token);
bot.mongoose = require('./handlers/mongoDB').init();
bot.config = require('./config/config.js');