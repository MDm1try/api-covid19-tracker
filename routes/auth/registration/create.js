const bcrypt = require('bcrypt')

const Users = require('../../../models/Users')
const sendInvitation = require('../../../mail/sendEmail')

const create = async (req, res) => {
    const {
        fistName,
        lastName,
        email,
        dob,
        password
    } = req.body
    try {
        const errors = {}
        if (!fistName) {
            errors.fistName = 'is required'
        } else if (!email) {
            errors.email = 'is required'
        } else if (!dob) {
            errors.dob = 'is required'
        } else if (!password) {
            errors.password = 'is required'
        } else if (!lastName) {
            errors.lastName = 'is required'
        } 

        const user = await Users.findOne({ email })
        if (user) {
            return res.status(400).send({error: 'Email is already exist'})
        }
        const salt = process.env.TOKEN_SECRET
        const cryptPassword = await bcrypt.hash(password, salt)
        const newUser = await Users({
            fistName,
            lastName,
            email,
            dob,
            password: cryptPassword
        })

        await newUser.save()

        await sendInvitation(fistName, email)
        return res.status(200).send({error: 'Email is already exist'})
    } catch(err) {
        return res.status(500).send({error: err.message})
    }
}

module.exports = create
