const { BOT_HEX } = require('../botconfig'), Embed = new (require('discord.js')).MessageEmbed().setColor(BOT_HEX), Discord = require('discord.js'),
    { readdirSync } = require('fs');
module.exports = {
    config: {
        name: "help",
        usage: "[command]"
    },
    run: async (bot, message, args, { prefix }) => {
        let commandList = "```ini\n";
        const commands = readdirSync(`./minecraft/`).filter(d => d.endsWith('.js'));

        Embed.fields = [], Embed.description = null, Embed.thumbnail = null;
        Embed.setAuthor(`${bot.user.username} Help { Nodejs ${process.version} - Discordjs ${Discord.version} }`, bot.user.displayAvatarURL({ size: 2048 }))
            .setFooter(`${bot.user.username}©️ from 2020 - ${new Date().getFullYear()}`)

        if (!args[0]) {
            for (let file of commands) commandList += `[»] ${file.substring(0, file.length - 3)}\n`;

            Embed.addField(`🔠 Commands`, `${commandList}\`\`\``).setThumbnail(bot.user.displayAvatarURL({ size: 2048 }))
        } else {
            var command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if (!command) {
                let cmd = (message.content.substring(prefix.length, message.content.indexOf(" ")).toLowerCase() !== prefix)
                    ? message.content.substring(prefix.length, message.content.indexOf(" ")).toLowerCase()
                    : message.content.slice(prefix.length).toLowerCase();
                let command = bot.commands.get(bot.aliases.get(cmd) || cmd);
                command = command.config;
                Embed.setTitle("Invalid Command!").setDescription(`Do \`${prefix}${command.name}\` for the entire list of commands.`);
            }
            command = command.config;
            Embed.setDescription(`\`\`\`ini\n[Command]: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
${command.aliases ? `[Aliases]: ${command.aliases.join(", ")}\n` : ""}${command.description ? `[Description]: ${command.description}\n` : ""}[Usage]: ${prefix}${command.name.toLowerCase()} ${command.usage || ""}\`\`\``)
        }
        return message.channel.send(Embed);
    }
}