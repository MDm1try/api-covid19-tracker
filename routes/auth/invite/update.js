const Users = require('../../../models/Users')
const { verifyToken } = require('../../../utils/auth')

const update = async (req, res) => {
    try {
        const token = req.params.token
        const data = verifyToken(token)
        if (!data) {
            return res.status(403).send({ error: 'token is invalid' })
        }
        console.log('data', data)
        const user = await Users.findOne({ _id: data._id })
        if (!user) {
            return res.status(403).send({ error: 'token is invalid' })
        }

        if (user.accepted) {
            return res.status(403).send({ error: 'This invitation has already been accepted' })
        }

        await user.updateOne({ accepted: true })

        return res.status(200).send({ success: true })
    } catch(err) {
        console.error(err)
        return res.status(500).send({ error: err.message })
    }
}

module.exports = update
