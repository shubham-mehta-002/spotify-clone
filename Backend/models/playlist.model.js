const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{       
        type:String,
        default:"https://res.cloudinary.com/dudcrgnld/image/upload/v1714719084/playlist_ocab5s.png"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    collaborators:[{
        type:String
    }],
    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Song"
    }],
    visibilityMode:{
        type:String,
        defaut:"private"
    }
   
},{timestamps :true})


const Playlist = mongoose.model("Playlist",playlistSchema)


module.exports = Playlist