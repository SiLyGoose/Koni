module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm")
        return message.author.send('**❌ Please use me in a designated server!**');

    const settings = await bot.getGuild(message.guild);
    const { prefix } = settings;

    let content = message.content.toLowerCase();
    if (!content.toLowerCase().startsWith(prefix) || content.toLowerCase() === prefix) return;

    let args = content.slice(settings.prefix.length).trim().split(/\s+/g);
    let cmd = args.shift();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (commandfile) {
        return commandfile.run(bot, message, args, settings);
    } else return;
}