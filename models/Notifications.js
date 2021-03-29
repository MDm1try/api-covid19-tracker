const mongoose = require('mongoose')
const { NOTIFICATION_STATUSES } = require('../utils/constants')

const schema = mongoose.Schema(
    {
        toUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
        message: { type: String, default: '', required: true },
        status: { type: String, default: '', required: true, enum: Object.values(NOTIFICATION_STATUSES) }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true } 
    },
)

module.exports = mongoose.model('Notifications', schema)
