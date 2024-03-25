//imports
require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const { db } = require('./model/product')

//initiallization
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//default route
app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api/product',productRoute)
app.use('/api/user',userRoute)

//server
app.listen(process.env.PORT || 5000)

//connection 
async function mongoConnection() {
    try { const res = await mongoose.connect(process.env.DB)
        const data = await res.default
        console.log(data.STATES.connected);
    } catch (error) {
     res.send("error",error.message)   
    }
}
mongoConnection()