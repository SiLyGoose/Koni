require('dotenv-flow').config();
module.exports = {
    mongoURL: process.env.MONGOURL,
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    ipaddr: "",
    channelID: "",
    messageID: "",
    lastKnownVersion: "",
    notifications: false,
    userList: []
}