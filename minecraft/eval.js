const util = require('util');
module.exports = {
    config: {
        name: "eval"
    },
    run: async (bot, message, args) => {
        if (message.author.id === '257214680823627777') {
            try {
                const code = args.join(" ");
                let evaled = eval(code);
                let hrStart = process.hrtime()
                let hrDiff = process.hrtime(hrStart);

                if (typeof evaled !== "string") evaled = util.inspect(evaled)
                if (Object.keys(evaled).length > 1987) evaled = `${evaled.substr(0, 1987)}...`

                message.channel.send(bot.clean(evaled), { code: "js" });
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*`)
            } catch (err) {
                return message.channel.send(`\`ERROR\` \`\`\`xl\n${bot.clean(err)}\n\`\`\``)
            }
        } else return message.channel.send(`¯\\_(ツ)_/¯`)
    }
}