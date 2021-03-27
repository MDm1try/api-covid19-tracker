const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
        latitude: { type: Number, default: 0, required: true },
        longitude: { type: Number, default: 0, required: true },
        timestamp: { type: Number, default: 0, required: true },
        accuracy: { type: Number, default: 0, required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true } 
    },
)

module.exports = mongoose.model('UserLocations', schema)
