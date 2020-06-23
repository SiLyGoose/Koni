const bot = new (require('./handlers/clientHandler.js'))({config: './config/config.js'});

["aliases", "commands"].forEach(x => bot[x] = new (require('discord.js')).Collection());
["commandHandler", "eventHandler"].forEach(x => require(`./handlers/${x}`)(bot));

require('dotenv-flow').config();
bot.login(require('./config/config.js').token);
bot.config = require('./config/config.js');