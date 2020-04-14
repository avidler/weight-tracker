const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
console.log("uri: ",uri)

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})