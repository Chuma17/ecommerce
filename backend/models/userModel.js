const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    isAdmin:{type: Boolean, default : false}
});

const User = mongoose.model("User", userSchema);
module.exports = User;