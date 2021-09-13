module.exports = class Error {
    async run(bot, message) {
        let { prefix } = bot.config;
        let cmd = message.content?.slice(prefix.length, Math.max(message.content?.indexOf(" "), 0) || undefined).toLowerCase();
        let command = bot.commands.get(bot.aliases.get(cmd) || cmd);
        let { name, usage, aliases } = command.config;

        let embed = bot.defaultEmbed.setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setTitle('❌ Invalid command usage!')
            .setDescription(`\`\`\`asciidoc
[Command] :: ${bot.Util.capitalize(name)}
[Usage] :: ${(prefix + usage) ?? "None"}
${("[Alias] :: " + aliases?.join(", ")) ?? ""}\`\`\``)
            .setFooter(`<> - required | [] - optional | () - options`)
        return bot.sendMessage(embed, message.channel);
    }
}