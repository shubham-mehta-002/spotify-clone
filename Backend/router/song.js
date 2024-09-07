const express = require('express')
const router = express.Router()
const passport = require('passport')
const Song = require('../models/song.model')
const User = require('../models/user.model')
const {cookieJWTAuth} = require("../utils/helpers")
const {cloudinary , uploadOnCloudinary} = require('../utils/cloudinary')

router.use(express.json())



// to upload new songs in database
router.post('/create',cookieJWTAuth,async(req,res)=>{
    // passport.authenticate middleware will automatically put user in req as req.user 
    const {name,thumbnail,track,duration} = req.body
    // console.log({aalo},thumbnail,track)

    const {user}=req

    if(!name || !thumbnail || !track || !duration)
        return res.status(301).json({message : "Insufficient details to create a song !!"})


    const artistId = user._id 
    const artist = await User.findById(artistId)
   
    const newSong = {name,thumbnail,track,artist:artistId,duration}
    const songDetails = await Song.create(newSong)
    
    
    // Add the newly created song to the songsOwned array of the user
    artist.songsOwned = [...artist.songsOwned, songDetails._id];
  
    // Save the updated artist object
    await artist.save();

    return res.status(200).json({success:true , song : songDetails})


})

// to get all songs that belong to me as a current artist
router.get('/my/songs',cookieJWTAuth,async(req,res)=>{
    const {user} = req;
    try{
        const {songsOwned}  = await User.findById(user._id).populate('songsOwned')
        return res.status(200).json({success:true , songs : songsOwned })

    }catch(err)
    {
        res.status(400).json({success:false , err:err.message})
    }

})

// to get all liked song
router.get('/liked',cookieJWTAuth,async(req,res)=>{
    const {user}= req;
    try{
        const {likedSongs} = await User.findById(user._id).populate({
            path:'likedSongs',
            populate:'artist'
        })
        return res.status(200).json({success:true , likedSongs})
    }catch(err){
        return res.status(400).json({success:false , err:err.message})
    }
})

router.post('/like',cookieJWTAuth,async(req,res)=>{
    const {user} = req
    const {songId} = req.body
    try{
        const fetchedUser = await User.findById(user._id)
        if(!fetchedUser)
            return res.status(400).json({sucess:false , message : "User doen't exist"})

        const song = await Song.findById(songId)
        
        if(!song){
            return res.status(400).json({success:false , message : "Incorrect song id passed "})
        }

        // fetchedUser = {...fetchedUser , likedSongs : (fetchedUser.likedSongs.filter(song => song._id !== songId))}
        // console.log(fetchedUser)
        fetchedUser.likedSongs = [...fetchedUser.likedSongs , songId] 
        // console.log({fetchedUser})
        await fetchedUser.save()
        return res.status(200).json({success:true , likedSongs: fetchedUser.likedSongs})
        
    }catch(err){
        return res.status(400).json({success:false , err:err.message})
    }
})

router.post('/unlike',cookieJWTAuth,async(req,res)=>{
    const {user} = req
    const {songId} = req.body
    try{
        const fetchedUser = await User.findById(user._id)
        if(!fetchedUser)
            return res.status(400).json({sucess:false , message : "User doen't exist"})

        const song = await Song.findById(songId)
        
        if(!song){
            return res.status(400).json({success:false , message : "Incorrect song id passed "})
        }
        
        fetchedUser.likedSongs = fetchedUser.likedSongs.filter(song_id =>song_id.toString() !== songId.toString())
        // console.log('mm',fetchedUser.likedSongs)
        await fetchedUser.save()
        return res.status(200).json({success:true , likedSongs: fetchedUser.likedSongs})
        
    }catch(err){
        return res.status(400).json({success:false , err:err.message})
    }
})

// to get all songs available
router.get('/',async(req,res)=>{
    try{
        
        const songs = await Song.find().populate(
            {
            path: "artist",
            select:"-password",
            populate:{
                path:"songsOwned",
            }
        }
    )
        
        return res.status(200).json({success:true,songs})
    }catch(err)
    {   
        console.log({err})
        return res.status(404).json({success:false, err:err.message})
    }
})

// to get song on basis of song name
router.get('/name/:songName',async(req,res)=>{
    try{
        const {songName} = req.params
        const song = await Song.find({name:songName})               
        return res.status(200).json({success:true,song})
    }catch(err)
    {
        res.status(400).json({success:false , err:err.message})
    }
})


// to get song on basis of songId
router.get('/id/:songId',async(req,res)=>{
    try{
        const {songId} = req.params
        // console.log(songId)
        const song = await Song.findById({_id: songId}).populate({
            path:"artist",
            select:"id firstName lastName username"
        })
        // if(!song || song.)
            // return res.status(400).json({success:false,message:"Song not found"})
        return res.status(200).json({sucess:true,song})
    }catch(err)
    {
        return res.status(500).json({success:false,err:err.message})
    }
    
})


module.exports= router