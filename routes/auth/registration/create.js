const bcrypt = require('bcrypt')

const Users = require('../../../models/Users')
const sendInvitation = require('../../../mail/sendInvitation')
const inputRegisterUser = require('../../../validation/inputRegisterUser')
const { USER_TYPES } = require('../../../utils/constants')
const { generateAccessToken } = require('../../../utils/auth')

const create = async (req, res) => {
    try {
        const { error, isValid } = inputRegisterUser(req.body)
        if (!isValid) {
            return res.status(400).send({ error })
        }
        const {
            firstName,
            lastName,
            email,
            dob,
            password,
            confirmLicense
        } = req.body
        
        const user = await Users.findOne({ email })
        if (user) {
            return res.status(400).send({ error: 'Email is already exist' })
        }
        const salt = process.env.TOKEN_SECRET
        const cryptPassword = await bcrypt.hash(password, salt)
        let newUser = new Users({
            firstName,
            lastName,
            email: email.toLowerCase(),
            dob,
            password: cryptPassword,
            type: USER_TYPES.CUSTOMER,
            confirmLicense
        })

        newUser = await newUser.save()
        const payload = { _id: newUser._id }
        const token = generateAccessToken({ payload }, null)
        const invitationUrl = `${process.env.PORT.API_URL}/api/v1/auth/invite/${token}`
        await sendInvitation(firstName, email, invitationUrl)
        return res.status(200).send({ success: true })
    } catch(err) {
        return res.status(500).send({ error: err.message })
    }
}

module.exports = create
