const mongoose = require('mongoose');

const webinarSchema = new mongoose.Schema({
    name: String,
    eventDate: String,
    description: String,
    videoLink: String,
    regLive: Boolean
});

const Webinar = mongoose.model('webinarList', webinarSchema);

module.exports = Webinar;