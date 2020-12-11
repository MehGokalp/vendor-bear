const mongoose = require('mongoose');
const config = require('./config');

async function connect() {
    return await mongoose.connect(config.db, { useUnifiedTopology: true, keepAlive: 1, useNewUrlParser: true });
}

module.exports = connect;
