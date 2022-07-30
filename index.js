require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

//database
const connectDB = require('./db/connect')

//routes
const authRoutes = require('./routes/authRoutes')

app.use(cors())
app.use(mongoSanitize())

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req, res)=>{
    res.send('mongodb jwt auth boilerplate')
})

app.use('/api/v1/auth', authRoutes)

const port = process.env.PORT || 5000

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()