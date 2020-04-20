const router = require('express').Router()
const path = require('path')

let User = require('../models/users.model')


router.route('/add').post((req, res) => {
    
    const date = req.body.date
    const weight = req.body.weight
    const username = req.body.username
    console.log("req is: ", req.body)

    const newWeights = {date, weight}// find user by username
    // add date and weight to weights object
    
    User.findOne({username:username})
    .then((user) => {
       
        user.updateOne(
       
            {$push: {weights: {
              date:newWeights.date, 
              weight:newWeights.weight,
              
            }}}
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