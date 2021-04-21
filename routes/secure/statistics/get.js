const Locations = require('../../../models/Locations')
const Users = require('../../../models/Users')
const UserStatuses = require('../../../models/UserStatuses')
const { USER_TYPES } = require('../../../utils/constants')

const get = async (req, res) => {
    const countLocations = await Locations.countDocuments()
    const users = await Users.find({ role: USER_TYPES.ADMIN })

    const stat = {
        countInfectedPlaces: 0,
        countHealthyPlaces: 0,
        countVaccinatedPlaces: 0,
        countRecoveredPlaces: 0,
        countPossiblyInfectedPlaces: 0,
        countLocations
    }

    for (const user in users) {
        const lastStatus = await UserStatuses.findOne({ userId: user._id }, null, { sort: { createdAt: -1 } })

        if (lastStatus) {
            if (lastStatus.isInfected) {
                stat.countInfectedPlaces++
            } else if (lastStatus.isHealthy) {
                stat.countHealthyPlaces++
            } else if (lastStatus.isVaccinated) {
                stat.countVaccinatedPlaces++
            } else if (lastStatus.isRecovered) {
                stat.countRecoveredPlaces++
            } else if (lastStatus.isPossiblyInfected) {
                stat.countPossiblyInfectedPlaces++
            } 
        }
    }

    return res.status(200).send(stat) 
}

module.exports = get