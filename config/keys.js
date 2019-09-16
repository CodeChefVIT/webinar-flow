require('dotenv').config();

let db = {
    mongoDB: process.env.mongoURL
}

module.exports = db;