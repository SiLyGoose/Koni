const mongoose = require('mongoose'), config = require('../config/config.js');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    prefix: {
        type: String, default: config.prefix
    },
    ipaddr: {
        type: String, default: config.ipaddr
    },
    port: {
        type: Number, default: config.port
    },
    channelID: {
        type: String, default: config.channelID
    },
    notifs: {
        type: Boolean, default: config.notifications
    },
    messageID: {
        type: String, default: config.messageID
    },
    lastKnownVersion: {
        type: String, default: config.lastKnownVersion
    },
    userList: {
        type: Array, default: config.userList
    },
    vpn: {
        type: Boolean, default: config.vpn
    },
    user: {
        type: String, default: config.user
    },
    password: {
        type: String, default: config.password
    }
});

module.exports = mongoose.model('Guild', guildSchema);