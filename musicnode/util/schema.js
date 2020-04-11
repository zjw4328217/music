const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema({
    username:String,
    password:String,
    tel:String,
    time:Date 
})

// var User = mongoose.model("musics",user_schema); 



  
exports.Users =mongoose.model("users",user_schema); ;
