const Users = require('../../../models/Users')
const { USER_TYPES } = require('../../../utils/constants')

const create = async (req, res) => {
    const name = req.query.name || ''
    const projection = {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        dob: 1,
        statuses: 1
    }
    const users = await Users.find({
        '$expr': {
            '$regexMatch': {
                'input': { '$concat': ['$firstName', ' ', '$lastName'] },
                'regex': name,  //Your text search here
                'options': 'i'
            }
        },        
        type: USER_TYPES.CUSTOMER
    }, projection).populate('statuses')

    return res.status(200).send({ users }) 
}

module.exports = create
