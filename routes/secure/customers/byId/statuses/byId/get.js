const UserStatuses = require('../../../../../../models/UserStatuses')

const get = async (req, res) => {
    const id = req.params.statusId
    try {
        const lastUserStatus = await UserStatuses.findOne({ userId: id }, null, { sort: { createdAt: -1 } })

        if (!lastUserStatus) {
            return res.status(404).send({ error: 'User status is not found' }) 
        }
        return res.status(200).send(lastUserStatus) 
    } catch(err) {
        return res.status(500).send({ error: err.message }) 
    }
}

module.exports = get
