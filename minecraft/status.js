const ping = require('minecraft-server-util'), { BOT_HEX } = require('../botconfig.json'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX);
module.exports = {
    config: {
        name: "status",
        description: "Provides current MC server stats",
        aliases: ["st"]
    },
    run: async (bot, message, args, settings) => {
        let IPaddr = settings.ipaddr;
        if (!IPaddr) return message.channel.send(`**⭕ No available IP addresses set for this server! Use \`${bot.config.prefix}settings ipaddr\` to set it!**`)

        return await ping(IPaddr, 25565, (err, res) => {
            Embed.fields = [], Embed.description = null, Embed.thumbnail = null;
            if (err) { console.log(err); return message.channel.send("**💥 Error connecting to server, please try again shortly!**"); }

            let playerNames = settings.userList;
            let names = [];

            if (res.samplePlayers) {
                for (let i = 0; i < res.samplePlayers.length; i++) {
                    let playerName = res.samplePlayers[i].name;
                    let filter = playerNames.filter(x => { return x.ign === playerName })
                    names.push(filter[0] ? filter[0].irl : playerName);
                }
            }

            message.channel.messages.fetch(settings.messageID).then(m => {
                m.delete();
            });

            return message.channel.send(Embed.setTitle(`${res.host}:${res.port}`)
                .addField(`Server Status`, `\`\`\`ini\n[Version]\n${res.version}\n[MOTD]\n${res.descriptionText}\`\`\``)
                .addField(`Player Status`, `\`\`\`ini\n[Online (${res.onlinePlayers})]\n${names.sort().join('\n') || 'None'}\n[Offline]\n${playerNames.length - names.length}\`\`\``)
                .setThumbnail(err || res.favicon.length > 2048 ? "https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP" : res.favicon)).then(async msg => {
                    await bot.updateGuild(message.guild, { messageID: msg.id, lastKnownVersion: err ? settings.lastKnownVersion : res.version });
                });
        });
    }
}