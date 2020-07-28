const settings = require("../minecraft/settings")

module.exports = class Prefix {
    constructor() {
        this.EMOJI = '❗';
        this.SETTING = 'Prefix'
        this.NAME = 'prefix';
        this.DESCRIPTION = 'Changes the prefix for the server';
        this.EX = '(any prefix)';
        this.UPDATE = 'Any characters up to length 4';
        this.VALID = /^\S{1,4}/;
    }
}