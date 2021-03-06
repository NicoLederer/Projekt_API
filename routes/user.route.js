const express = require('express')
const User = require('../models/user.model')
const router = express.Router()


router.post('/signup',(req,res)=>{
    User.findOne({email:req.body.email},(user,err)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            if(user==null){
                const user = User({
                    email:req.body.email,
                    password:req.body.password
                })
                user.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.json(err)
                    }else{
                        console.log(user)
                        res.json(user)
                    }
                    
                })
            }else{

            res.json({
                message:'email is not avilable'
            })   
            }
        }
    })
    
})

router.post('/signin',(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        
        if(!user){
            res.status(404).json({error:"Ungültig"})
        }else{
            res.json(user)
        }
    })
    

})
module.exports = router