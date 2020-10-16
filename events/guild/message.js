module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
        let random = Math.floor(Math.random() * 2);
        return message.author.send(random ? '<:nessacringe:757806405657952267>' : '<:ohBoy:712048274709938298>').then(x => {
            x.channel.recipient.send(random ? `**Please use me in a designated server instead. ✌️**` : `**Use me in a designated server you filthy fkn mortal. <:HandsUp:591111022551760907>**`);
        });
    }
    // return message.author.send('**❌ Please use me in a designated server!**');

    const settings = await bot.getGuild(message.guild);
    const { prefix } = settings;

    let { content } = message;
    let start_prefix = content.toLowerCase().startsWith(prefix) ? prefix : `<@!${bot.user.id}>`;
    if (content == `<@!${bot.user.id}>`) return message.channel.send()
    if (!content.startsWith(start_prefix) || content.toLowerCase() === prefix) return;

    let args = content.slice(start_prefix.length).trim().split(/\s+/g);
    let cmd = args.shift().toLowerCase();

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (commandfile) {
        return commandfile.run(bot, message, args, settings);
    } else return;
}