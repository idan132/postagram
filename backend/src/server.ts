//Packages
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))
app.use(bodyParser.json())

//DB Connection
import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error=>{console.error(error)})
db.once('open', ()=>{console.log('Connected to mongo DB')})

//Routes
import postRouter from './routes/post_route'
import messageRouter from './routes/message_route'

app.use(express.static('public'))
app.use('/post', postRouter)
app.use('/messages', messageRouter)

//Export app object for server.js
export default app