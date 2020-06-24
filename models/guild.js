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
    }
});

module.exports = mongoose.model('Guild', guildSchema);