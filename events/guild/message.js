const { BOT_HEX } = require('../../botconfig'), Embed = new (require('discord.js')).MessageEmbed();
module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const settings = bot.config;

    let content = message.content.toLowerCase();
    if (!content.toLowerCase().startsWith(prefix) || content.toLowerCase() === prefix) return;

    if (message.channel.type === "dm") {
        return message.guild.member(message.guild.members.get(message.member) || message.member)
            .send('**❌ Please use commands in a designated server!**');
    }

    let args = content.slice(settings.prefix.length).trim().split(/\s+/g);
    let cmd = args.shift();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (commandfile) {
        return commandfile.run(bot, message, args, settings);
    } else return;
}