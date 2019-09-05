const mongoose = require('mongoose');

const webinarSchema = new mongoose.Schema({
    name: String,
    eventDate: String,
    description: String,
    videoLink: String
});

const Webinar = mongoose.model('newWebinar', webinarSchema);

module.exports = Webinar;