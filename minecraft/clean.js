module.exports = {
    config: {
        name: 'clean',
        description: 'Cleans all bot commands and remnants'
    },
    run: async (bot, message, args, { prefix }) => {
        message.channel.messages.fetch().then(x => {
            const botu = x.filter(m => m.author.id === bot.user.id || m.content.toLowerCase().startsWith(prefix)).array();

            if (!(botu.length - 1)) return message.channel.send(`❌ No messages to clean!`);

            for (let i = 0; i < botu.length; i++) {
                let { content } = botu[i];
                let cmd, index = -1;
                if (content.startsWith(prefix)) {
                    index = i;
                    cmd = content.indexOf(" ")
                        ? content.split(' ')[0].slice(prefix.length).toLowerCase()
                        : content.slice(prefix.length).toLowerCase()
                }
                if (!bot.commands.get(bot.aliases.get(cmd) || cmd) && index > -1) {
                    botu.splice(index, 1)
                }
            }

            message.channel.bulkDelete(botu);
            message.channel.send(`✅ Cleaned \`${botu.array().length - 1}\` messages!`).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 2000)
            });
        });
    }
}