const Locations = require('../../../models/Locations')
const inputCreateLocation = require('../../../validation/inputCreateLocation')

const create = async (req, res) => {
    try {
        const { error, isValid } = inputCreateLocation(req.body)
        if (!isValid) {
            return res.status(400).send({ error })
        }
        const {
            name,
            diameter,
            latitude,
            longitude,
        } = req.body
    
        const location = new Locations({
            name,
            diameter,
            latitude,
            longitude,
        })
        await location.save()
        return res.status(200).send({ success: true })
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }

}

module.exports = create
