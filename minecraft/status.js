const ping = require('minecraft-server-util'), { BOT_HEX } = require('../botconfig.json'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX);
module.exports = {
    config: {
        name: "status",
        description: "Provides current MC server stats",
    },
    run: async (bot, message, args, settings) => {
        let IPaddr = settings.ipaddr;
        if (!IPaddr) return message.channel.send(`**⭕ No available IP addresses set for this server! Use \`${bot.config.prefix}settings ipaddr\` to set it!**`)

        return await ping(IPaddr, 25565, (err, res) => {
            if (err) throw err;

            Embed.fields = [], Embed.description = null, Embed.thumbnail = null;
            message.channel.send(Embed.setTitle(`${res.host}:${res.port}`)
                .addField(`Server Status`, `\`\`\`ini\n[Version]\n${res.version}\n[MOTD]\n${res.descriptionText}\`\`\``)
                .addField(`Player Status`, `\`\`\`ini\n[Online]\n${res.onlinePlayers}\n[Offline]\n${res.maxPlayers - res.onlinePlayers}\`\`\``)
                .setThumbnail("https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP"));
        });
    }
}