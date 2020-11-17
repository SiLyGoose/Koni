module.exports = class User {
    constructor() {
        this.EMOJI = '🔐'
        this.SETTING = 'Password'
        this.NAME = 'pass'
        this.DESCRIPTION = 'Provides password for VPN'
        this.EX = '(pass)';
        this.UPDATE = '(pass)';
        this.VALID = /\w+/i
    }
}