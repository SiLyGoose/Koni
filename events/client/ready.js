const { BOT_HEX } = require('../../botconfig.json'),
    Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX),
    ping = require('minecraft-server-util');
module.exports = async bot => {
    bot.user.setPresence({ activity: { name: `Mindcraft | ${bot.config.prefix}help`, type: 'WATCHING' }, status: 'idle' }).catch(console.error);

    console.log(`${bot.user.username} presence secured!`)

    setInterval(() => {
        bot.guilds.cache.forEach(async guild => {
            const Guild = bot.guilds.cache.find(x => x == guild.id);
            let settings = await bot.getGuild(Guild);
            if (settings.notifs && settings.channelID) {
                let channel = bot.channels.cache.get(settings.channelID.match(/\d{18}/g)[0]);

                return await ping(settings.ipaddr, 25565, (err, res) => {
                    Embed.fields = [], Embed.description = null, Embed.thumbnail = null;

                    let playerNames = settings.userList;
                    let names = [], mods = 0;

                    if (res) {
                        if (res.samplePlayers) {
                            for (let i = 0; i < res.samplePlayers.length; i++) {
                                let playerName = res.samplePlayers[i].name;
                                let filter = playerNames.filter(x => { return x.ign === playerName })
                                names.push(filter[0] ? filter[0].irl : playerName);
                            }
                        }
                        if (res.modList) {
                            for (let l = 0; l < res.modList.length; l++) mods++;
                        }
                    }

                    Embed.setThumbnail(err || res.favicon.length > 2048 ? "https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP" : res.favicon)
                        .setTitle(err ? "Server Down" : `${res.host}:${res.port}`)
                        .addField(`Server Status`, `\`\`\`ini\n[Version${err ? " (Last Known)" : ""}]\n${err ? settings.lastKnownVersion || "Unavailable" : res.version}\n[MOTD]\n${err ? "Unavailable" : res.descriptionText}${mods ? `\n[Mods]\n${mods}` : ""}\`\`\``)
                        .addField(`Player Status`, `\`\`\`ini\n[Online (${err ? "" : res.onlinePlayers})]\n${err ? "Unavailable" : names.sort().join('\n') || 'None'}\`\`\``) /*\n[Offline]\n${err ? "Unavailable" : Math.max(playerNames.length - names.length, 0)}*/

                    channel.messages.fetch(settings.messageID).then(m => {
                        if (m.embeds[0].fields[0].value != Embed.fields[0].value ||
                            m.embeds[0].fields[1].value != Embed.fields[1].value) {
                            if (channel.lastMessage.embeds && channel.lastMessageID === settings.messageID) {
                                if (channel.lastMessage.embeds[0].title === 'Server Down' || channel.lastMessage.embeds[0].title === `${settings.ipaddr}:${settings.port}`) {
                                    m.edit(Embed).then(async () => {
                                        await bot.updateGuild(Guild, { lastKnownVersion: err ? settings.lastKnownVersion : res.version });
                                    }).catch(console.error);
                                }
                            } else {
                                m.delete().catch(console.error);
                                channel.send(Embed).then(async msg => {
                                    await bot.updateGuild(Guild, { messageID: msg.id, lastKnownVersion: err ? settings.lastKnownVersion : res.version });
                                }).catch(console.error);
                            }
                        }
                    }).catch(err => {
                        console.log(err.stack)
                        channel.send(Embed).then(async msg => {
                            await bot.updateGuild(Guild, { messageID: msg.id, lastKnownVersion: err ? settings.lastKnownVersion : res.version });
                        }).catch(console.error);
                    });
                });
            }
        });
    }, 5000);
}