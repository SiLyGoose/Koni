const { BOT_HEX } = require('../botconfig'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX), Discord = require('discord.js'),
    { readdirSync } = require('fs');
module.exports = {
    config: {
        name: "help",
        usage: "[command]"
    },
    run: async (bot, message, args) => {
        let commandList = "```ini\n";
        const commands = readdirSync(`./minecraft/`).filter(d => d.endsWith('.js'));
        for (let file of commands) commandList += `[»] ${file.substring(0, file.length - 3)}\n`;

        return message.channel.send(Embed.addField(`🔠 Commands`, `${commandList}\`\`\``).setThumbnail(bot.user.displayAvatarURL)
            .setAuthor(`${bot.user.username} Help { Nodejs ${process.version} - Discordjs ${Discord.version} }`)
            .setFooter(`${bot.user.username}©️ from 2020 - ${new Date().getFullYear()}`)).catch(console.error);
    }
}