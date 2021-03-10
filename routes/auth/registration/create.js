const bcrypt = require('bcrypt')

const Users = require('../../../models/Users')
const sendInvitation = require('../../../mail/sendEmail')
const inputRegisterUser = require('../../../validation/inputRegisterUser')

const create = async (req, res) => {
    const {
        fistName,
        lastName,
        email,
        dob,
        password
    } = req.body

    try {
        const { errors, isValid } = inputRegisterUser(req.body)
        if (!isValid) {
            return res.status(400).send({ errors })
        }
        
        const user = await Users.findOne({ email })
        if (user) {
            return res.status(400).send({ error: 'Email is already exist' })
        }
        const salt = process.env.TOKEN_SECRET
        const cryptPassword = await bcrypt.hash(password, salt)
        const newUser = new Users({
            fistName,
            lastName,
            email,
            dob,
            password: cryptPassword
        })

        await newUser.save()

        await sendInvitation(fistName, email)
        return res.status(200).send({ success: true })
    } catch(err) {
        return res.status(500).send({ error: err.message })
    }
}

module.exports = create
