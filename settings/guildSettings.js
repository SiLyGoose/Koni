module.exports = class guildSettings {
    constructor() {
        this.PREFIX = new (require('./prefix.js'))
        this.IPADDR = new (require('./ipaddr'))
        this.PORT = new (require('./port'))
        // this.VPN = new (require('./vpn'))
        // this.USER = new (require('./user'))
        // this.PASSWORD = new (require('./password'))
        this.NOTIFS = new (require('./notifications'))
        this.CHANNELID = new (require('./channelID'))
        this.ADD = new (require('./add'))
        this.REMOVE = new (require('./remove'))
        this.RESET = new (require('./reset'))
        this.CONFIGURATIONS = [this.PREFIX, this.IPADDR, this.PORT, /*this.VPN, this.USER, this.PASSWORD,*/ this.NOTIFS, this.CHANNELID, this.ADD, this.REMOVE, this.RESET]
    }
}