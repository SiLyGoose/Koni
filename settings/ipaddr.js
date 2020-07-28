module.exports = class Ipaddr {
    constructor() {
        this.EMOJI = '🔢';
        this.SETTING = 'IP Address';
        this.NAME = 'ipaddr';
        this.DESCRIPTION = 'Sets the MC IP Address for the server';
        this.EX = 'x.x.x.x';
        this.UPDATE = 'Valid IP Address (formatted x.x.x.x)';
        this.VALID = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    }
}