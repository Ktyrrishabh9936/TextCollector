const express = require('express');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser')
const router = express.Router();
// create a user using post /api/auth/createuser

const JWTSTRING = "this$mineString";
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:3})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors.array()})
    }
   let myuser= await user.findOne({email:req.body.email});
   try{
   if(myuser){
    return res.status(400).json({success:false,error:"Email Already Exists"})
   }
   const salt = await bcrypt.genSalt(10);
   const secpss = await bcrypt.hash(req.body.password,salt);
   myuser = await user.create({
        name:req.body.name,
        password:secpss,
        email:req.body.email
    })
    const data ={
        user:{
            id:myuser.id
        }
    }
    const authtoken = jwt.sign(data,JWTSTRING);

    // res.send(`${myuser.name} is Saved Successfully`)
    res.json({success:true,auth:authtoken});
    // .then(user=>res.json(user))
    // .catch(err=>{ console.log(err)
    // res.json({error:"please enter unique value in the world"})})
    // console.log(req.body)
    // const usr = user(req.body);
    // usr.save();
} catch(error){
    console.error(error.message);
    res.status(500).send('internal server Error1');
}
});

router.post('/login',[
    body('email',"enter an valid email").isEmail(),
    body('password',"It cannot null").exists()
],async(req,res)=>{
    let update = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    const {email,password} = req.body;
    const myuser = await user.findOne({email:email});
    try{
    if(!myuser){
        return res.status(400).json({error:"Enter Valid Credentails"});
    }

    const passmatch = await bcrypt.compare(password,myuser.password);
    if(!passmatch){
        return res.status(400).json({updater:update,error:"Enter Valid Credentails"});
    }

        const data ={
            user:{
                id:myuser.id
            }
    }
    const authtoken = jwt.sign(data,JWTSTRING, { expiresIn: '24h'});
    update = true;
    res.json({updater:update, Authtoken:authtoken});

} catch(error){
    console.error(error.message);
    res.status(500).send('internal server Error2');
}
}
);

router.post('/getuser',fetchuser,async(req,res)=>{
    try{
    const userid = req.user.id;
    console.log(userid);
    const myuser = await user.findById(userid).select('-password');
    res.json(myuser);
    }
    catch(err){
        console.log(err);
        res.status(400).json({"error":err.message});
    }
})
module.exports = router;