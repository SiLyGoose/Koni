const { Client } = require('discord.js');

module.exports = class extends Client {
    constructor() {
        super();
        console.log(`Client initialized on ${process.version}`);
    }
}