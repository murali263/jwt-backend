
const express = require('express')
const mongoose = require('mongoose');
const user = require('../model/user');
const router = express.Router()
const User = require('../model/user') 
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://TEST:TEST@cluster0.hjnfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const Emp = require('../model/employee')

router.get('/',(req,res)=>{
    res.send('i am from api')
})

mongoose.connect(db, err =>{
    if(err){
      console.log("ERROR" + err)
    }
    else{
      console.log("connected")
    }
  })



  router.post('/register',(req,res)=>{
      let userData = req.body
      let user = new User(userData)
      user.save((error,registeruser)=>{
          if(error){
              console.log('user data not found')
          }
          else{
             let  payload = {subject:registeruser._id}
            let  token = jwt.sign(payload,'myadmin')
              res.status(200).send({token})
          }
      })   
  })
//   router.put('/update',(req,res,next)=>{
//   emp.findById(req.body._id,(err,empdet)=>{
//       if(err)
//       res.status(500).json({errmsg:err});
//       emp.username = req.body.username;
//       emp.password = req.body.password;
//       emp.phonenumber = req.body.phonenumber;
//       emp.save((err,empdet)=>{
//           res.status(500).json({errmsg:err});
//           res.status(200).json({msg:empdet})
//       });

//   })
// });
  router.post('/employee',(req,res)=>{
     let empData = req.body
     let emp = new Emp(empData) 
     emp.save((error,empdetails)=>{
         if(error){
             console.log(error)
         }
         else{
             res.status(200).send(empdetails)
         }
     })
})


  


  router.post('/login',(req,res)=>{
      let userData = req.body
      user.findOne({username:userData.username},(error,logindata)=>{
          if(error){
              
              console.log('ERROR' + error)
          }
          else{
              if(!logindata){
                res.status(401).send('user name is required')
              

              }
              else if(logindata.password !== userData.password ){
                res.status(401).send('password not match')
                  
              }
              else{
                  let payload = {subject:logindata._id}
                  let token = jwt.sign(payload,'myadmin')
                  res.status(200).send({token})
              }
          }
      })
  })

  function verifytoken(req,res,next){
if(!req.Headers.authorization){
   return  res.status(401).send('no header')
}
let token = req.Headers.authorization.split('')[1]
if(token==='null'){
return res.status(401).send('no token')
}
let payload = jwt.verify(token,'myserectkey')
if(!payload){
return res.status(401).send('token no')
}
req.userid = payload.subject
  }



  router.get('/listing',verifytoken,(req,res)=>{})



  
  router.get('/list',(req,res)=>{
    let empData = req.body
    let emp = new Emp(empData) 
      emp.find((error,empdetails)=>{
          if(error){
              console.log('user')
             // res.status(401).send('user data list ')  
          }
          else{
              console.log(empdetails)
          // res.status(200).send()
          }
      })
  })

  module.exports = router