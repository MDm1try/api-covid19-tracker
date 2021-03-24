const Locations = require('../../../../models/Locations')

const remove = async (req, res) => {
    const id = req.params.id
    const location = await Locations.findById(id)
    if (!location) {
        return res.status(404).send({ error: 'Location is not found' }) 
    }
    await location.deleteOne()
    
    return res.status(200).send({ success: true }) 
}

module.exports = remove