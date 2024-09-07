const express = require('express')
const app=express()
require('dotenv').config()

const cors = require('cors')

const User = require('./models/user.model')
const port = process.env.PORT || 4000

const authRoutes = require('./router/auth')
const songRoutes = require('./router/song')
const artistRoutes = require('./router/artist')
const playlistRoutes = require('./router/playlist')
const profileRoutes = require('./router/user')

var cookieParser = require('cookie-parser')

const {connectWithDb} = require('./db/connectWithDb')


app.use(cors())

// connect with mongoDB atlas
connectWithDb()
.then(res => console.log("Successfully connected with Db "))
.catch(err=> console.log("Error occured while connecting with database !!"))

app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.use('/auth',authRoutes)
app.use('/song',songRoutes)
app.use('/artist',artistRoutes)
app.use('/playlist',playlistRoutes)
app.use('/profile',profileRoutes)


app.listen(port,()=>{
    console.log("App running at PORT : ",port)
})
