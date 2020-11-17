module.exports = class RemovePlayers {
    constructor() {
        this.EMOJI = '🇷';
        this.SETTING = 'Remove Players';
        this.NAME = 'remove';
        this.DESCRIPTION = 'Removes players from the `status` popup (CASE SENSITIVE)';
        this.EX = 'name';
        this.UPDATE = 'IRL name';
        this.VALID = /\w+/
    }
}