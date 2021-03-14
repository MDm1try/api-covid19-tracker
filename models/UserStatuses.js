const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
        infected: { type: Boolean, default: false, required: true }, // red
        health: { type: Boolean, default: false, required: true }, // green
        vaccinated: { type: Boolean, default: false, required: true }, // blue
        recovered: { type: Boolean, default: false, required: true }, // yellow
        risk: { type: Boolean, default: false, required: true }, // orange
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('UserStatuses', schema)
