const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        name: { type: String, required: true },
        diameter: { type: Number, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    {
        timestamps: true 
    },
)

module.exports = mongoose.model('Locations', schema)
