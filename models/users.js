const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    weightPref: { type: String },
    weights: [{
        weight: {type: Number, required: true},
        date: {type: Date}
    }]
},
{ timestamps: false },
{ versionKey: false }
)

const User = mongoose.model('User', userSchema)

module.exports = User