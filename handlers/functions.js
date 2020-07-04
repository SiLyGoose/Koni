const { Guild } = require('../models/app')
const mongoose = require('mongoose');
module.exports = bot => {
    bot.getGuild = async guild => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else {
            await bot.createGuild({ guildID: guild.id });
            return bot.config;
        }
    }

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return await data.updateOne({ $set: data });
    }

    bot.createGuild = async settings => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, bot.config);
        let merged = Object.assign(defaults, settings);

        const newGuild = new Guild(merged);
        return newGuild.save();
    }

    bot.deleteGuild = async guild => {
        let data = await bot.getGuild(guild);
        return await data.deleteOne(data);
    }

    bot.clean = text => {
        return typeof text === 'string'
            ? text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
            : text;
    }

    bot.objectEmpty = obj => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }
}