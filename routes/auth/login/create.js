const bcrypt = require('bcrypt')

const Users = require('../../../models/Users')
const inputLoginUser = require('../../../validation/inputLoginUser')
const { generateAccessToken } = require('../../../utils/auth')


const create = async (req, res) => {
    try {
        const { error, isValid } = inputLoginUser(req.body)
        if (!isValid) {
            return res.status(400).send({ error })
        }
        const {
            email,
            password
        } = req.body
        const user = await Users.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(400).send({ error: 'The email or password is invalid' }) 
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).send({ error: 'The email or password is invalid' }) 
        }
        const payload = { _id: user._id, type: user.type }
        const jwtToken = generateAccessToken(payload, '24h')

        return res.status(200).send({
            jwtToken, 
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            type: user.type
        }) 
    } catch(err) {
        return res.status(500).send({ error: err.message })
    }
}

module.exports = create
