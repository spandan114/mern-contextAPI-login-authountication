const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')
const requireLogin = require('../middleware/requireLogin')
var nodemailer = require('nodemailer');
var crypto = require('crypto');

//=========== NODE MAILER ===================//

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'add your email',
      pass: 'add password',
  }
});

//====================== REGISTER =======================//

router.post("/register", (req, res) => {
  
    const {name,email,password} = req.body 
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"}) 
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
           return res.status(422).
           json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                  email,
                  password:hashedpassword,
                  name
              })
      
              user.save()
              .then(user=>{

                  var mailOptions = {
                         from: 'spandanj685@gmail.com',
                         to: user.email,
                         subject: 'welcome '+user.name,
                         text: 'welcome '+user.name
                       };

                     transporter.sendMail(mailOptions, function(error, info){
                       if (error) {
                         console.log(error);
                       } else {
                         console.log('Email sent: ' + info.response);
                       }
                     });

                  res.json({message:"saved successfully"+user.email})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
    })
    .catch(err=>{
      console.log(err)
    })

});

//====================== LOGIN ==================//

router.post("/login", (req, res) => {
    

    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email} = savedUser
               res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

  });

//================ FORGOT PASSWORD ==================//

  router.post("/forgotpassword",(req, res) => {

    crypto.randomBytes(32,(err,buffer) => {
      if(err){
        console.log(err)
      }
        const token = buffer.toString("hex")

        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
               return res.status(422).json({error:"Invalid Email"})
            }else{
              user.token = token
              user.expiretoken = Date.now() + 3600000
              user.save().then(res=>{

                var mailOptions = {
                  from: 'spandanj685@gmail.com',
                  to: user.email,
                  subject: 'Password Reset',
                  html:`<p>you are requested for password reset</p>
                  <h5>click this link to <a href="http://localhost:3000/reset/${token}">
                  reset your password<a/></h5>`
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              });
            return res.json({error:"Email successfully send check your Email to reset password"})
            }
          })
    })

  })

  //================ SET NEW PASSWORD ==================//

  router.post("/setnewpassword",(req, res) => {
      const newpass = req.body.password
      const sendToken = req.body.token

      User.findOne({token:sendToken,expiretoken:{$gt:Date.now()}}).then(user=>{
        if(!user){
          return res.status(422).json({error:"sorry Token Expired Try Again"}) 
        }else{
          bcrypt.hash(newpass,12).then(hashedpassword=>{
            user.password=hashedpassword
            user.token=undefined
            user.expiretoken=undefined
            user.save().then((savedUser)=>{
              return res.json({error:"Password Updated Successfully"}) 
            })
          })
        }
      }).catch(err=>{
        console.log(err)
      })
  })

  router.get("/protected",requireLogin,(req, res) => {
      
  })

module.exports = router
