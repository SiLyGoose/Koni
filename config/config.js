require('dotenv-flow').config();
module.exports = {
    mongoURL: process.env.MONGOURL,
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
    ipaddr: "",
    port: 25565,
    channelID: "",
    messageID: "",
    lastKnownVersion: "",
    notifications: false,
    userList: [],
    // vpn: false,
    // user: "",
    // password: ""
}