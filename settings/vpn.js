module.exports = class Vpn {
    constructor() {
        this.EMOJI = '🕵️'
        this.SETTING = 'VPN'
        this.NAME = this.SETTING.toLowerCase()
        this.DESCRIPTION = 'Connects to VPN for the server'
        this.EX = 'on/off';
        this.UPDATE = 'on/off';
        this.VALID = /(on|off|true|false)/i
    }
}