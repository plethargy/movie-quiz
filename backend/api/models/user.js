var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    password: String,
    score : Number
});

module.exports = mongoose.model('User', userSchema);