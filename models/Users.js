const mongoose = require('mongoose')
const { USER_TYPES } = require('../utils/constants')


const schema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
        confirmLicense: {
            type: Boolean,
            required: true,
            default: true,
        },
        accepted: { type: Boolean, required: true, default: false },
        type: { type: String, required: true, enum: Object.values(USER_TYPES) },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true } 
    },
)

schema.virtual('statuses', {
    ref: 'UserStatuses',
    localField: '_id',
    foreignField: 'userId',
    justOne: false, // set true for one-to-one relationship
    options: { sort: { createdAt: -1 }, limit: 1 }
})

schema.virtual('locations', {
    ref: 'UserLocations',
    localField: '_id',
    foreignField: 'userId',
    justOne: false, // set true for one-to-one relationship
    options: { sort: { createdAt: -1 } }
})

schema.virtual('notifications', {
    ref: 'Notifications',
    localField: '_id',
    foreignField: 'toUser',
    justOne: false, // set true for one-to-one relationship
    options: { sort: { createdAt: -1 } }
})

module.exports = mongoose.model('Users', schema)
