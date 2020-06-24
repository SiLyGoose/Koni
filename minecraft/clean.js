module.exports = {
    config: {
        name: 'clean',
        description: 'Cleans all bot commands and remnants'
    },
    run: async (bot, message, args, { prefix }) => {
        message.channel.messages.fetch().then(x => {
            const botu = x.filter(m => m.author.id === bot.user.id || m.content.toLowerCase().startsWith(prefix));

            if (!botu.array().length) return message.channel.send(`❌ No messages to clean!`)

            message.channel.bulkDelete(botu);
            message.channel.send(`✅ Cleaned \`${botu.array().length - 1}\` messages!`).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 2000)
            });
        });
    }
}