const Discord = require('discord.js'), { BOT_HEX } = require('../botconfig'), Embed = new Discord.MessageEmbed().setColor(BOT_HEX);
module.exports = {
    config: {
        name: "settings",
        usage: "[setting]",
        aliases: ["s"]
    },
    run: async (bot, message, args, settings) => {
        if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id !== '257214680823627777')
            return message.channel.send(`**${message.author.username}**, you do not have permission to access this command!`);

        let setting = args[0] ? args[0].toLowerCase() : undefined;
        let newSetting = args.slice(1).join(' ');

        Embed.setAuthor(`${message.guild.name} Settings`, message.guild.iconURL({ dynamic: true }));
        Embed.fields = [], Embed.description = null, Embed.thumbnail = null;

        var tempvar = [{ EMOJI: '❗', SETTING: 'Prefix', NAME: 'prefix', DESCRIPTION: 'Changes the prefix for the server', EX: '(any prefix)', UPDATE: 'Any characters up to length 4', VALID: /^\S{1,4}/ },
        { EMOJI: '🔢', SETTING: 'IP Address', NAME: 'ipaddr', DESCRIPTION: 'Sets the MC IP Address for the server', EX: 'x.x.x.x', UPDATE: 'Valid IP Address (formatted x.x.x.x)', VALID: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ },
        { EMOJI: '🔌', SETTING: 'Port', NAME: 'port', DESCRIPTION: 'Changes the default MC port for the server', EX: '(any port)', UPDATE: 'Valid Port Number', VALID: /^\d{1,5}$/ },
        { EMOJI: '📳', SETTING: 'Notifications', NAME: 'notifs', DESCRIPTION: 'Toggles server notifications', EX: 'on/off', UPDATE: 'on/off', VALID: /(on|off|true|false)/i },
        { EMOJI: '📃', SETTING: 'Notification Channel', NAME: 'channelID', DESCRIPTION: 'Sets the channel for server notifications', EX: 'channel id/name', UPDATE: 'Any channel id/mention', VALID: /\d{18}/g },
        { EMOJI: '🇦', SETTING: 'Add Players', NAME: 'add', DESCRIPTION: 'Adds players to the `status` popup (CASE SENSITIVE)', EX: 'ign name', UPDATE: 'MC ign and IRL name', VALID: /\w+\s\w+/g },
        { EMOJI: '🇷', SETTING: 'Remove Players', NAME: 'remove', DESCRIPTION: 'Removes players from the `status` popup (CASE SENSITIVE)', EX: 'name', UPDATE: 'IRL name', VALID: /\w+/ },
        { EMOJI: '♻️', SETTING: 'Reset', NAME: 'reset', DESCRIPTION: 'Resets server settings to default' }];

        for (let i = 0; i < tempvar.length; i++) {
            Embed.addField(`${tempvar[i].EMOJI} ${tempvar[i].SETTING}`, `\`${settings.prefix}settings ${tempvar[i].NAME}\``, true);
            if (i % 2 == 0) Embed.addField('\u200B', '\u200B', true);
        }

        const selected = tempvar.find(s => s.NAME.toLowerCase() === setting);
        if (selected) {
            if (!newSetting) {
                if (setting === 'reset') {
                    await message.channel.send(`**⚠️ Reset all settings to default? (y/n) \`10s\`**`)
                    const collector = new Discord.MessageCollector(message.channel, filter => filter.author.id === message.author.id, { time: 10000, max: 1 });

                    collector.on('collect', m => {
                        var msg = m.content.toLowerCase();
                        if (['yes', 'y'].indexOf(msg)) {
                            bot.deleteGuild(message.guild);
                            return message.channel.send(`**☑️ Settings set to default**`);
                        } else if (['no', 'n'].indexOf(msg)) {
                            return m.react('✅');
                        }
                    });
                } else {
                    Embed.fields = [];
                    let currentSetting = "";
                    let settingName = settings[selected.NAME.replace(/(add|remove){1}(\s|)/gi, "userList")];
                    if (Array.isArray(settingName)) {
                        for (let i = 0; i < settingName.length; i++) {
                            currentSetting += `${settingName[i].ign} (${settingName[i].irl})` + (i + 1 >= settingName.length ? "" : ", ");
                        }
                    }
                    return message.channel.send(Embed.setDescription(selected.DESCRIPTION)
                        .addField(`✅ Current ${typeof selected.SETTING === 'boolean'
                            ? selected.SETTING
                                ? 'on'
                                : 'off'
                            : selected.SETTING.replace(/(add|remove)\s{1}/gi, "")}`, `\`${currentSetting || settingName || 'Nothing Set'}\``)
                        .addField(`✏ Update:`, `\`${settings.prefix}settings ${selected.NAME} ${selected.EX}\``)
                        .addField(`⭕ Valid Settings:`, `\`${selected.UPDATE}\``));
                }
            } else {
                try {
                    if (selected.VALID.test(newSetting)) {

                        if (selected.NAME === 'notifs') newSetting = /(true|on)/i.test(newSetting) ? true : false;
                        else if (selected.NAME === 'add' || selected.NAME === 'remove') {
                            let guild = await bot.getGuild(message.guild);
                            let userList = guild.userList || [];
                            let arguments = newSetting.split(' ');
                            var userObject = { ign: arguments[0], irl: arguments[1] };
                            userList.push(userObject);
                            let names = "";
                            for (let i = 0; i < userList.length; i++) names += `${userList[i].ign} (${userList[i].irl})` + (i + 1 >= userList.length ? " " : ", ");
                            await bot.updateGuild(message.guild, { userList: userList });
                            return message.channel.send(`**☑️ Updated \`${selected.SETTING.replace(/(add|remove)\s{1}/gi, "")}\`: ${names.trim()}**`)
                        }
                        var object = {};
                        object[selected.NAME] = newSetting;

                        await bot.updateGuild(message.guild, object);
                        return message.channel.send(`**☑️ Updated \`${selected.SETTING}\` to \`${typeof newSetting === 'boolean' ? newSetting ? 'on' : 'off' : newSetting}\`!**`)
                    } else {
                        return message.channel.send(`Valid Settings for **${selected.SETTING}**: \`${selected.EX}\``)
                    }
                } catch (err) {
                    return message.channel.send(`**❌ Error occurred while updating to database!**`)
                }
            }
        } else {
            return message.channel.send(Embed.setThumbnail(message.guild.iconURL({ dynamic: true })));
        }
    }
}