const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        fistName: { type: String, required: true },
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
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Users', schema)
