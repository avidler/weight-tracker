const router = require('express').Router()

let User = require('../models/users.model')

router.route('/').get((req, res) => {
    console.log("Finding users...")
    User.find()
    .then((result) => {
        console.log("result: ",result),
        res.json(result)
    })
    .catch(err => res.status(400).json('Error: ' + err))

})
module.exports = router