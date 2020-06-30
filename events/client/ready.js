const { BOT_HEX } = require('../../botconfig.json'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX),
    ping = require('minecraft-server-util');
module.exports = async bot => {
    bot.user.setPresence({ activity: { name: `Mindcraft | ${bot.config.prefix}help`, type: 'WATCHING' }, status: 'idle' });

    console.log(`${bot.user.username} presence secured!`)

    setInterval(async () => {
        bot.guilds.cache.forEach(async guild => {
            const Guild = bot.guilds.cache.find(x => x == guild.id);
            let settings = await bot.getGuild(Guild);
            if (settings.notifs && settings.channelID) {
                let channel = bot.channels.cache.get(settings.channelID.match(/\d{18}/g)[0]);

                return await ping(settings.ipaddr, 25565, (err, res) => {
                    if (err) return;
                    Embed.fields = [], Embed.description = null, Embed.thumbnail = null;


                    let playerNames = settings.userList;
                    let names = [];

                    for (let i = 0; i < res.samplePlayers.length; i++) {
                        let playerName = res.samplePlayers[i].name;
                        let filter = playerNames.filter(x => { return x.ign === playerName })
                        names.push(filter[0].irl || playerName);
                    }

                    Embed.setThumbnail(err || res.favicon.length > 2048 ? "https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP" : res.favicon)
                        .setTitle(err ? "Server Down" : `${res.host}:${res.port}`)
                        .addField(`Server Status`, `\`\`\`ini\n[Version]\n${err ? settings.lastKnownVersion : res.version}\n[MOTD]\n${err ? "Unavailable" : res.descriptionText}\`\`\``)
                        .addField(`Player Status`, `\`\`\`ini\n[Online (${res.onlinePlayers})]\n${names.sort().join('\n')}\n[Offline]\n${playerNames.length - names.length}\`\`\``)

                    try {
                        if (channel.lastMessage.embeds[0].fields[0].value != Embed.fields[0].value ||
                            channel.lastMessage.embeds[0].fields[1].value != Embed.fields[1].value) {
                            channel.messages.fetch(settings.messageID).then(m => {
                                if (channel.lastMessageID === settings.messageID) {
                                    m.edit(Embed);
                                } else {
                                    m.delete();
                                    channel.send(Embed).then(async msg => {
                                        await bot.updateGuild(Guild, { messageID: msg.id, lastKnownVersion: err ? settings.lastKnownVersion : res.version });
                                    });
                                }
                            });
                        }
                    } catch (err) {
                        channel.messages.fetch(settings.messageID).then(m => {
                            if (m.embeds[0].fields[0].value != Embed.fields[0].value ||
                                m.embeds[0].fields[1].value != Embed.fields[1].value) {
                                m.delete().catch(console.error);
                                channel.send(Embed).then(async msg => {
                                    await bot.updateGuild(Guild, { messageID: msg.id });
                                });
                            }
                        }).catch(() => {
                            channel.send(Embed).then(async msg => {
                                await bot.updateGuild(Guild, { messageID: msg.id });
                            })
                        });
                    }
                });
            }
        })
    }, 5000);
}