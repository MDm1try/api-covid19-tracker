const Locations = require('../../../models/Locations')

const get = async (req, res) => {
    const name = req.query.name || ''
    const locations = await Locations.find({
        '$expr': {
            '$regexMatch': {
                'input': '$name',
                'regex': name,  //Your text search here
                'options': 'i'
            }
        },  
    })
    return res.status(200).send({ locations }) 
}

module.exports = get