const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const usermodel = mongoose.model('user',UserSchema);
// usermodel.createIndexes();
module.exports = usermodel;