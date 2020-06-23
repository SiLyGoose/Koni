const Embed = new (require('discord.js')).MessageEmbed(), { BOT_HEX } = require('../../botconfig.json');
module.exports = class Jiku {
    async run(bot, message) {
        let { prefix } = bot.config;
        let cmd = message.content.length
            ? message.content.slice(prefix.length, message.content.indexOf(" ") == -1 ? undefined : message.content.indexOf(" ")).toLowerCase()
            : message.content.slice(prefix.length);
        let command = bot.commands.get(bot.aliases.get(cmd) || cmd);
        let { name, usage, aliases } = command.config;

        Embed.setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setTitle('❌ Invalid command usage!')
            .setDescription(`\`\`\`asciidoc
[Command] :: ${name[0].toUpperCase() + name.slice(1)}
[Usage] :: ${usage ? prefix + usage : "None"}
[Alias] :: ${aliases ? aliases.join(", ") : "None"}\`\`\``)
            .setFooter(`<> - required | [] - optional | () - options`)
            .setColor(BOT_HEX)
        return message.channel.send(Embed);
    }
}