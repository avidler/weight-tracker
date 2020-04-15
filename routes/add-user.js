const router = require('express').Router()

let User = require('../models/users.model')

router.route('/').post((req, res) => {
    console.log(req)
    const username = req.body.username
    console.log(username)
    const newUser = new User({username})

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))

})
module.exports = router