const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const usersRouter = require('./routes/users')
const weightsRouter = require('./routes/weights')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/weights', weightsRouter)

const uri = process.env.ATLAS_URI
//console.log("uri: ",uri)

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


const connection = mongoose.connection
connection.once('open', (t) => {
    console.log("MongoDB database connection established successfully")


})


// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', function(req, res) {
    console.log("Hello")
  });


app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`)
})