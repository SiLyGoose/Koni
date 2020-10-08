const ping = require('minecraft-server-util'),
    { BOT_HEX } = require('../botconfig.json'),
    Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX);
module.exports = {
    config: {
        name: "status",
        description: "Provides current MC server stats",
        aliases: ["st"]
    },
    run: (bot, message, _, settings) => {
        let IPaddr = settings.ipaddr;
        if (!IPaddr) return message.channel.send(`**⭕ No available IP addresses set for this server! Use \`${settings.prefix}settings ipaddr\` to set it!**`);

        return ping(IPaddr, 25565, (err, res) => {
            Embed.fields = [], Embed.description = null, Embed.thumbnail = null;
            if (err) { console.log(err); return message.channel.send("**💥 Error connecting to server, please try again shortly!**"); }

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

            message.channel.messages.fetch(settings.messageID).then(async m => {
                await m.delete();
            }).catch(console.error);

            Embed.setThumbnail(err || res.favicon.length > 2048 ? "https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP" : res.favicon)
                .setTitle(err ? "Server Down" : `${res.host}:${res.port}`)
                .addField(`Server Status`, `\`\`\`ini\n[Version${err ? " (Last Known)" : ""}]\n${err ? settings.lastKnownVersion || "Unavailable" : res.version}\n[MOTD]\n${err ? "Unavailable" : res.descriptionText}${mods ? `\n[Mods]\n${mods}` : ""}\`\`\``)
                .addField(`Player Status`, `\`\`\`ini\n[Online (${err ? "" : res.onlinePlayers})]\n${err ? "Unavailable" : names.sort().join('\n') || 'None'}\`\`\``) /*\n[Offline]\n${err ? "Unavailable" : Math.max(playerNames.length - names.length, 0)}*/

            return message.channel.send(Embed)
                .then(async msg => {
                    await bot.updateGuild(message.guild, { messageID: msg.id, lastKnownVersion: res.version || settings.lastKnownVersion });
                }).catch(console.error);
        });
    }
}