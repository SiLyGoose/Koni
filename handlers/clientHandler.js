const { Client } = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super();
        this.config = config;
        console.log(`Nodejs initialized on ${process.version}`);
    }
}