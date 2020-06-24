const { Client } = require('discord.js');

module.exports = class extends Client {
    constructor() {
        super();
        console.log(`Nodejs initialized on ${process.version}`);
    }
}