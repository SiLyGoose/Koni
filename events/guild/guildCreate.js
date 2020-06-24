module.exports = async (bot, guild) => {
    try {
        let settings = await bot.getGuild(guild);
        let channels = guild.channels.cache.filter(channel => channel.type === 'text'), channelID;
        channelLoop:
        for (let c of channels) {
            if (c[1].type === 'text') {
                channelID = c[0];
                break channelLoop;
            }
        }
        let channel = bot.channels.cache.get(channelID);
        channel.send(`**Thank you for adding me!** <:HYPERAYAYA:579342448627679232>
\`»\` My prefix here is \`${settings.prefix}\`
\`»\` You can view my full list of commands by typing \`${settings.prefix}help\`
\`»\` You can view/change my server configurations with \`${settings.prefix}settings\`
\`»\` For further instructions, you can refer to \`${settings.prefix}help [command]\``)
    } catch (err) {
        console.error(err)
    }
}