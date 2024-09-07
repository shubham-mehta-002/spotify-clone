const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{ 
        type:String,
        required:true
    },
    track:{ 
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    // isLiked:{
    //     type:Boolean,
    //     default:false
    // },
    duration:{
        type:Number,
        required:true,
        default:0
    }
   
},{timestamps :true})


const Song = mongoose.model("Song",songSchema)


module.exports = Song