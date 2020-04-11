var express=require('express');
var router =express.Router();
const {Users} = require('../util/schema');
router.get("/index",(req,res) => {
    res.send("vue接口数据")
})


router.post("/register",(req,res) => {
    console.log(req.body)
    var body=req.body;
    Users.findOne({username:body.username}).then(result => {
        console.log(result)
        if(!result){
            body.time=new Date();
            Users.insertMany(body).then(result => {
                res.json({
                    msg:"success",
                    code:200,
                    body:req.body
                })
            })
        }else{
            res.json({
                msg:"false",
                code:200,
                
            })
        }

    })
    
})


router.post("/login",(req,res) => {
    console.log(req.body)
    var body=req.body;
    Users.findOne({
        username:body.username,
        
    }).then(result => {
        console.log(result)
        if(result.password===body.password){
            res.json({
                msg:"success",
                code:200,
            })
        }else{
            res.json({
                msg:"false",
                code:200,
                
            })
        }
    })
    
})

module.exports=router