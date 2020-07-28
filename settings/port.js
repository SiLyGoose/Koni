module.exports = class Port {
    constructor() {
        this.EMOJI = '🔌';
        this.SETTING = 'Port';
        this.NAME = 'port';
        this.DESCRIPTION = 'Changes the default MC port for the server';
        this.EX = '(any port)';
        this.UPDATE = 'Valid Port Number';
        this.VALID = /^\d{1,5}$/
    }
}