const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    weightPref: { type: String },
    weights: [{
        weight: {type: Number},
        date: {type: String}
    }]
},
{ timestamps: false },
{ versionKey: false },
{ collection: 'users'}
)

const User = mongoose.model('User', userSchema)

module.exports = User