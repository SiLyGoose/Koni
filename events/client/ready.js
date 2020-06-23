module.exports = async bot => {
    bot.user.setPresence({ activity: { name: `Mindcraft | ${bot.config.prefix}help`, type: 'WATCHING' }, status: 'idle' });

    console.log(`${bot.user.username} presence secured!`)
}