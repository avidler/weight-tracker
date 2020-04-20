const router = require('express').Router()
const path = require('path')

let User = require('../models/users.model')


router.route('/add').post((req, res) => {
    
    const username = req.body.username
    console.log("req is: ", req.body.username)
    const newUser = new User({username: username})
    console.log("new user is: ", newUser)
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').get((req, res) => {
    
    User.find()
    
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router