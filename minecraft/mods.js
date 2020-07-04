const ping = require('minecraft-server-util'), { BOT_HEX } = require('../botconfig.json'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX);
module.exports = {
    config: {
        name: 'mods',
        description: 'States, if any, current mods in server'
    }, run: (bot, message, args, { ipaddr, prefix }) => {
        if (!ipaddr) return message.channel.send(`**⭕ No available IP addresses set for this server! Use \`${prefix}settings ipaddr\` to set it!**`);

        return ping(ipaddr, 25565, (err, res) => {
            Embed.fields = [], Embed.description = null, Embed.thumbnail = null;
            if (err) { console.log(err); return message.channel.send("**💥 Error connecting to server, please try again shortly!**"); }

            let mods = [];
            if (res.modList.length) {
                for (let i = 0; i < res.modList.length; i++) {
                    mods.push(`[»] ${res.modList[i].modid} (${res.modList[i].version})`);
                }
            }

            Embed.setThumbnail(err || res.favicon.length > 2048 ? "https://lh3.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP" : res.favicon)
                .setTitle(`Mod List`)
                .addField(`Mods`, !mods.length ? "None" : `\`\`\`ini\n${mods.sort().join('\n')}\`\`\``)

            return message.channel.send(Embed);
        })
    }
}