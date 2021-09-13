const util = require('util');
module.exports = {
    async execute (interaction) {
        if (interaction.user.id === '257214680823627777') {
            try {
                const code = interaction.options._hoistedOptions.join(" ");
                let evaled = eval(code);
                let hrStart = process.hrtime()
                let hrDiff = process.hrtime(hrStart);

                if (typeof evaled !== "string") evaled = util.inspect(evaled)
                if (Object.keys(evaled).length > 1987) evaled = `${evaled.substr(0, 1987)}...`

                interaction.client.sendMessageChannel((interaction.client.clean(evaled), { code: "js" }), interaction.channel);
                return interaction.client.sendMessageChannel(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*`, interaction.channel)
            } catch (err) {
                return interaction.channel.send(`\`ERROR\` \`\`\`xl\n${interaction.client.clean(err)}\n\`\`\``)
            }
        }
    }
}