const router = require('express').Router()
const path = require('path')

let User = require('../models/users.model')


router.route('/add').post((req, res) => {
    
    console.log("req is: ", req.body)
    const username = req.body.username
    const newWeights = req.body.newWeights
    
    User.findOne({username:username})
    .then((user) => {
       
        user.updateOne(
           
            {$set: {weights: newWeights}}
        )
        .then(result => console.log(result))
        .then(() => res.json('Weights added!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
}) 

router.route('/').get((req, res) => {
    User.find()
    
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router