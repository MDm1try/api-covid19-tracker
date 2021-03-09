const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        fistName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        dob: { type: String, required: true },
        password: { type: String, required: true },
        confirmLicense: {
            type: String,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Users', schema)
