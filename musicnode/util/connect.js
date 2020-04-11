
// Mongoose是在node.js环境下对mongodb进行便捷操作的对象模型工具
// 通过 Mongoose 操作 mongodb 数据库   mongoose使mongodb操作更简单便捷

const mongoose = require("mongoose");
const hostname = "59.110.173.149";
const port = 27017;
const dbName = "music";
const user = "root"
const password = "Zj4328217"

// const CONN_DB_STR =  `mongodb://${hostname}:${port}/${dbName}`;
const CONN_DB_STR =  `mongodb://${hostname}:${port}/${dbName}`;
// mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')

mongoose.connect(CONN_DB_STR,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});   // 链接数据库  
const connection = mongoose.connection;   // 链接对象 
// setTimeout(function(){
//     mongoose.disconnect(function(){
//         console.log("断开连接");
//     })
// }, 2000);

// var {User} = require("./schema");

// User.find({},{}).then(result=>{
//     console.log(result);
// })

connection.on("connected",()=>{
    console.log("mongoose 链接 成功");
})

connection.on("open",()=>{
    console.log("mongoose 链接 成功 并且 打开 ");
})

connection.on("error",(err)=>{
    console.log("数据库链接 异常 = " + err);
})

connection.on("disconnected",()=>{
    console.log("mongoose 断开链接 ")
})