const UserLocations = require('../../../../models/UserLocations')
const inputTrackLocation = require('../../../../validation/inputTrackLocation')


const create = async (req, res) => {
    try {
        const { error, isValid } = inputTrackLocation(req.body)
        if (!isValid) {
            return res.status(400).send({ error })
        }
        const {
            latitude,
            longitude,
            timestamp,
            accuracy,
        } = req.body
        const user = req.user

        const userLocations = new UserLocations({
            latitude,
            longitude,
            timestamp,
            accuracy,
            userId: user._id
        })
        await userLocations.save()

        return res.status(200).send({ success: true })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}


module.exports = create