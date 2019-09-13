const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const emailsWebinarSchema = new mongoose.Schema({
    email: String,
    webinarId: ObjectId
})

const EmailWebinar = mongoose.model('emailsWebinar', emailsWebinarSchema);

module.exports = EmailWebinar;