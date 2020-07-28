module.exports = class guildSettings {
    constructor() {
        this.PREFIX = new (require('./prefix.js'))
        this.IPADDR = new (require('./ipaddr'))
        this.PORT = new (require('./port'))
        this.NOTIFS = new (require('./notifications'))
        this.CHANNELID = new (require('./channelID'))
        this.ADD = new (require('./addPlayers'))
        this.REMOVE = new (require('./removePlayers'))
        this.RESET = new (require('./reset'))
        this.CONFIGURATIONS = [this.PREFIX, this.IPADDR, this.PORT, this.NOTIFS, this.CHANNELID, this.ADD, this.REMOVE, this.RESET]
    }
}