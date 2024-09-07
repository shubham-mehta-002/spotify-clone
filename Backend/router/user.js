const express = require('express')
const router = express.Router()
const {cookieJWTAuth} = require("../utils/helpers")
const User = require('../models/user.model')

router.use(express.json())


router.get('/',cookieJWTAuth,async(req,res)=>{
    const {user} = req
    try{
        const fetchedUser = await User.findById(user._id).lean()
        if(!fetchedUser)
            return res.status(400).json({success:false , message:"User not found"})

        const userDetialsToReturn = {...fetchedUser , password:undefined , __v:undefined}
        return res.status(200).json({success:true , user:userDetialsToReturn})
    }catch(err){
        return res.status(400).json({success:false , message : err.messgae})
    }
})

router.post('/update/photo',cookieJWTAuth,async(req,res)=>{
    const {user} = req
    const {token ,  photo}= req.body
    try{
        const fetchedUser  = await User.findById(user._id)
        if(!fetchedUser)
            return res.status(400).json({success:false , message : "User not found"})

        fetchedUser.profileImage = photo

        await fetchedUser.save()
        const userDetails = fetchedUser.toObject()
        userDetails.profileImage = photo
        return res.status(200).json({success:true , user : userDetails})
    }catch(err){
        return res.status(400).json({success:false , message: err.message})
    }
})

module.exports = router