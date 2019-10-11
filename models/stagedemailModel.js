const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const stagedEmailSchema = new mongoose.Schema({
    email: String,
    webinarId: ObjectId
})

const stagedEmail = mongoose.model('stagedEmail', stagedEmailSchema);

module.exports = stagedEmail;