const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const notes = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const notemodel = mongoose.model('notes',notes);
module.exports = notemodel;