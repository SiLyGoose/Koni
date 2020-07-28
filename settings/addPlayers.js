module.exports = class AddPlayers {
    constructor() {
        this.EMOJI = '🇦';
        this.SETTING = 'Add Players';
        this.NAME = 'add';
        this.DESCRIPTION = 'Adds players to the `status` popup (CASE SENSITIVE)';
        this.EX = 'ign name';
        this.UPDATE = 'MC ign and IRL name';
        this.VALID = /\w+\s\w+/g
    }
}