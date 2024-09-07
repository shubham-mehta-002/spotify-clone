const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {getToken} = require('../utils/helpers')

const {cookieJWTAuth} =require('../utils/helpers')

router.use(express.json())  // no need of body-parser

// POST request to create new User
router.post('/register',async(req,res)=>{

    // assuming req.body of type : {firstName,lastName,email,username,password}
    const {firstName,lastName,email,username,password} = req.body;
    
    //does a user already exist
    const user = await User.findOne({email:email})

    if(user)        
        //by default json has statusCode of 200
        return res.status(409).json({success:false , message: "A user with this email already exists"})

    //else create a new user
    const hashedPassword = await bcrypt.hash(password,10)
    
    const newUserData = {firstName,lastName,email,username,password:hashedPassword}
    const newUser = await User.create(newUserData)


    // create token to return to the user
    const token = await getToken(newUser)

    const UserToReturn = {...newUser.toJSON() , token}

    delete UserToReturn.password  // or UserToReturn.password = undefined ->this is done for security reasons
    UserToReturn.__v= undefined
    return res.status(200).json({success:true , user:UserToReturn})

})

router.post('/login',async(req,res)=>{
    const {email : user_email , password } = req.body
   
    const user = await User.findOne({email:user_email})

    if(!user)
        return res.status(401).json({success:false , message : "Invalid credentials"})
    const isPasswordValid = await bcrypt.compare(password , user.password)
    if(!isPasswordValid)
        return res.status(401).json({success:false , message : "Invalid credentials"})

    // create token to return to the user
    const token = await getToken(user)

    
 
  

    const UserToReturn = {user , token}
    delete UserToReturn.password  // or UserToReturn.password = undefined ->this is done for security reasons
    UserToReturn.__v= undefined

    return res.status(200).json({success:true , user:UserToReturn})

}) 

module.exports = router



// const cookieJWTAuth = async(req,res,next)=>{
//     const token= req.headers['authorization']
//     console.log({hehehe : req.cookie})
//     console.log('le',{token})
//     try{
//         const {user} = jwt.verify(token, process.env.JWT_SECRET_KEY)
      
//         req.user={...user};
//         // console.log(req.user)
//         next()
//     }catch(err){
//         res.clearCookie('token')
//         console.log("token nhi hai tere middleware ke paas",err)
//     }
// }
