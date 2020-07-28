module.exports = class Notifications {
    constructor() {
        this.EMOJI = '📳';
        this.SETTING = 'Notifications';
        this.NAME = 'notifs';
        this.DESCRIPTION = 'Toggles server notifications';
        this.EX = 'on/off';
        this.UPDATE = 'on/off';
        this.VALID = /(on|off|true|false)/i
    }
}