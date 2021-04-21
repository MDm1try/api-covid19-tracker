const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
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
