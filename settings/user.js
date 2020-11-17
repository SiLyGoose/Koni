module.exports = class User {
    constructor() {
        this.EMOJI = '👤'
        this.SETTING = 'User'
        this.NAME = this.SETTING.toLowerCase()
        this.DESCRIPTION = 'Provides user for VPN'
        this.EX = 'user';
        this.UPDATE = '(user)';
        this.VALID = /\w+/i
    }
}