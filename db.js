const mongoose = require("mongoose");
require('dotenv').config();
const MongoUrl = process.env.BASE;
console.log(MongoUrl);
const connection = ()=>{
mongoose.connect(MongoUrl,()=>{
    console.log("connection SuccessFul");
}); 
}

module.exports = connection;
