const Discord = require('discord.js'), { BOT_HEX } = require('../botconfig'), Embed = new Discord.MessageEmbed().setColor(BOT_HEX),
    guildSettings = require('../settings/guildSettings')
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

        var tempvar = new guildSettings().CONFIGURATIONS;

        for (let i = 0; i < tempvar.length; i++) {
            Embed.addField(`${tempvar[i].EMOJI} ${tempvar[i].SETTING}`, `\`${settings.prefix}settings ${tempvar[i].NAME}\``, true);
            if (i % 2 == 0) Embed.addField('\u200B', '\u200B', true);
        }

        const selected = tempvar.find(s => s.NAME.toLowerCase() === setting);
        if (selected) {
            if (!newSetting) {
                if (setting === 'reset') {
                    let instanceMsg = await message.channel.send(`**⚠️ Reset all settings to default? (y/n) \`10s\`**`)
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

                    collector.on('end', m => {
                        if (!collector.received) return instanceMsg.react('❌');
                    })
                } else {
                    Embed.fields = [];
                    let currentSetting = "";
                    let settingName = settings[selected.NAME.replace(/^(add|remove){1}(\s|)/gi, "userList")];
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
                        if (selected.NAME === 'notifs' || selected.NAME === 'vpn') newSetting = /(true|on)/i.test(newSetting) ? true : false;
                        else if (selected.NAME === 'add' || selected.NAME === 'remove') {
                            let guild = await bot.getGuild(message.guild);
                            let userList = guild.userList || [];
                            let arguments = newSetting.split(',');
                            for (let i = 0; i < arguments.length; i++) {
                                let player = arguments[i].split(' ');
                                var userObject = { ign: player[0], irl: player[1] };
                                userList.push(userObject);
                            }
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