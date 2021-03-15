const Users = require('../../../../models/Users')

const get = async (req, res) => {
    const id = req.params.id
    try {
        const projection = {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            dob: 1,
            statuses: 1
        }
        console.log('id', id)
        const user = await Users.findById(id, projection).populate('statuses')
        console.log('user', user)
        if (!user) {
            return res.status(404).send({ error: 'User is not found' }) 
        }
        return res.status(200).send(user) 
    } catch(err) {
        return res.status(500).send({ error: err.message }) 
    }
}

module.exports = get
