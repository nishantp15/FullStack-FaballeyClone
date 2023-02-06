const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String
},{timestamps:true});

const users = mongoose.model('users',UserSchema);

module.exports ={users}