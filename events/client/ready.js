const { BOT_HEX } = require('../../botconfig.json'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX),
    ping = require('minecraft-server-util');
module.exports = async bot => {
    bot.user.setPresence({ activity: { name: `Mindcraft | ${bot.config.prefix}help`, type: 'WATCHING' }, status: 'idle' });

    console.log(`${bot.user.username} presence secured!`)

    setInterval(async () => {
        for (const guild of bot.guilds.cache) {
            const Guild = bot.guilds.cache.find(x => x == guild[0]);
            let settings = await bot.getGuild(Guild);
            if (settings.notifs && settings.channelID) {
                let channel = bot.channels.cache.get(settings.channelID.match(/\d{18}/g)[0]);

                return await ping(settings.ipaddr, 25565, (err, res) => {
                    if (err) return;
                    
                    Embed.fields = [], Embed.description = null, Embed.thumbnail = null;
                    try {
                        Embed.setThumbnail(res.favicon)
                    } catch (err) {
                        Embed.setThumbnail("https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP");
                    }
                    Embed.setTitle(`${res.host}:${res.port}`)
                        .addField(`Server Status`, `\`\`\`ini\n[Version]\n${res.version}\n[MOTD]\n${res.descriptionText}\`\`\``)
                        .addField(`Player Status`, `\`\`\`ini\n[Online]\n${res.onlinePlayers}\n[Offline]\n${res.maxPlayers - res.onlinePlayers}\`\`\``)

                    try {
                        if (channel.lastMessageID === settings.messageID) {
                            if (channel.lastMessage.embeds[0].fields[0].value != Embed.fields[0].value) {
                                channel.messages.fetch(settings.messageID).then(m => {
                                    m.edit(Embed);
                                });
                            }
                        } else {
                            channel.messages.fetch(settings.messageID).then(m => {
                                m.delete();
                            });
                            channel.send(Embed).then(async msg => {
                                await bot.updateGuild(Guild, { messageID: msg.id });
                            });
                        }
                    } catch (err) {
                        channel.send(Embed).then(async msg => {
                            await bot.updateGuild(Guild, { messageID: msg.id });
                        });
                    }
                });
            }
        }
    }, 10000);
}