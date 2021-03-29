const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        radius: { type: Number, required: true }, // meters
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    {
        timestamps: true 
    },
)

module.exports = mongoose.model('Locations', schema)
