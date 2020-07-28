module.exports = class NotificationChannel {
    constructor() {
        this.EMOJI = '📃';
        this.SETTING = 'Notification Channel';
        this.NAME = 'channelID';
        this.DESCRIPTION = 'Sets the channel for server notifications';
        this.EX = 'channel id/name';
        this.UPDATE = 'Any channel id/mention';
        this.VALID = /\d{18}/g
    }
}