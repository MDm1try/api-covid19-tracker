const Locations = require('../../../../models/Locations')

const get = async (req, res) => {
    const id = req.params.id
    const location = await Locations.findById(id)
    if (!location) {
        return res.status(404).send({ error: 'Location is not found' }) 
    }
    return res.status(200).send(location) 
}

module.exports = get
