const mongoose = require('mongoose'), config = require('../config/config.js');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: {
        type: String, default: config.prefix
    },
    ipaddr: {
        type: String, default: config.ipaddr
    },
    channelID: {
        type: String, default: config.channelID
    },
    notifs: {
        type: Boolean, default: config.notifications
    },
    messageID: {
        type: String, default: config.messageID
    }
});

module.exports = mongoose.model('Guild', guildSchema);