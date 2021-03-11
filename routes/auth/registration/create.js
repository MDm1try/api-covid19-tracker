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
        
        const user = await Users.findOne({ email: email.toLowerCase() })
        if (user) {
            return res.status(400).send({ error: 'Email is already exist' })
        }
        const salt = await bcrypt.genSalt(10)
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
        const token = generateAccessToken({ payload }, '100d')
        const invitationUrl = `${process.env.API_URL}/api/v1/auth/invite/${token}`
        await sendInvitation(email, firstName, invitationUrl)
        return res.status(200).send({ success: true })
    } catch(err) {
        return res.status(500).send({ error: err.message })
    }
}

module.es = create
