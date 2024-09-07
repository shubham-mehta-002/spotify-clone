const express = require('express')
const router=express.Router()
const User = require('../models/user.model')
const passport = require('passport')

// to get all songs that are related to some artistID
router.get('/:artistId',async(req,res)=>{
    try{
        const {artistId} = req.params
        if(!artistId)
            return res.status(404).json({success:false , error : "Artist id not found"}) 

        const artist = await User.findById({_id: artistId}).populate('songsOwned').select('-password')
        return res.status(200).json({success:true , artist})
    }catch(err)
    {
        return res.status(400).json({success:false , error : err.message})
    }
    
})

// to get all playlists for a particular artist
router.get('/artist/:artistId',async(req,res)=>{
    try{
        const {artistId}= req.params
        const artist = await User.findById(artistId)
        if(!artist)
            return res.status(401).json({success:false,message:"Artist doesn't exist "})

        const playlists = await Playlist.find({owner:artistId})
        res.status(200).json({success:true , playlists})
    }catch(err)
    {
        res.json({success:false,err:err.message})
    }
})



    module.exports=router