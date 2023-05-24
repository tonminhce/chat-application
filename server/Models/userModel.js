const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 30},
    email: {type: String, required: true, minlength: 5, maxlength: 100, unique: true},
    password: {type: String, required: true, minlength: 5, maxlength: 1024}
},{
    timestamps: true,
});

const userModel = mongoose.model('User', userSchema); // User is the name of the collection in the database

model.exports = userModel;

     