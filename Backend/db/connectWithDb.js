const {mongoDB_URI} = require('../constants')
const mongoose = require('mongoose')

async function connectWithDb()
{
    try{ 
        const connectionDetails = await mongoose.connect(mongoDB_URI)
    }
    catch(err){
        console.log("ERROR : ",err.message)
    }
}

module.exports = {connectWithDb}