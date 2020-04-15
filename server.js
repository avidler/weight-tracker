const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const addUserRouter = require("./routes/add-user")
const seeAllUsersRouter = require("./routes/users")

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
//console.log("uri: ",uri)

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


const connection = mongoose.connection
connection.once('open', (t) => {
    console.log("MongoDB database connection established successfully")


})


app.use('/add-user', addUserRouter)
app.use('/users', seeAllUsersRouter)



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