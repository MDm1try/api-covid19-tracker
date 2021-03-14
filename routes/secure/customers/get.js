const Users = require('../../../models/Users')
const { USER_TYPES } = require('../../../utils/constants')

const create = async (req, res) => {

    const projection = {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        dob: 1,
        statuses: 1
    }
    const users = await Users.find({ type: USER_TYPES.CUSTOMER }, projection).populate('statuses')

    return res.status(200).send({ users }) 
}

module.exports = create
