const mongoose = require('mongoose');
const { mongoURL } = require('../config/config.js');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10,
            connectTimeoutMS: 20000,
        }
        mongoose.connect(mongoURL, dbOptions);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected!')
        })
        mongoose.connection.on('err', err => {
            console.log(err.stack)
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected!')
        })
    }
}