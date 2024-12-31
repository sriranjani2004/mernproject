const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const UserModel = mongoose.model("user", userSchema);

// Export the UserModel correctly
module.exports = UserModel;
