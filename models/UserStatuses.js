const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
        isInfected: { type: Boolean, default: false, required: true }, // red
        isHealthy: { type: Boolean, default: false, required: true }, // green
        isVaccinated: { type: Boolean, default: false, required: true }, // blue
        isRecovered: { type: Boolean, default: false, required: true }, // yellow
        isPossiblyInfected: { type: Boolean, default: false, required: true }, // orange
    },
    {
        timestamps: true,
        toJSON: { virtuals: true } 
    },
)

module.exports = mongoose.model('UserStatuses', schema)
