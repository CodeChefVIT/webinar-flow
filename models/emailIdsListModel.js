const mongoose = require('mongoose');

const emailIdsSchema = new mongoose.Schema({
    email: String
});

const EmailId = mongoose.model('emailIdList', emailIdsSchema);
module.exports = EmailId;