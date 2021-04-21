const Locations = require('../../../models/Locations')
const Users = require('../../../models/Users')
const UserStatuses = require('../../../models/UserStatuses')
const { USER_TYPES } = require('../../../utils/constants')

const get = async (req, res) => {
    const countLocations = await Locations.countDocuments()
    const users = await Users.find({ role: USER_TYPES.CUSTOMER })

    const stat = {
        countInfectedCustomers: 0,
        countHealthyCustomers: 0,
        countVaccinatedCustomers: 0,
        countRecoveredCustomers: 0,
        countPossiblyInfectedCustomers: 0,
        countLocations
    }
    console.log('users', users)
    for (const user of user._id) {
        console.log('users', users)

        const lastStatus = await UserStatuses.findOne({ userId: user._id }, null, { sort: { createdAt: -1 } })
        console.log('lastStatus', lastStatus)
        if (lastStatus) {
            if (lastStatus.isInfected) {
                stat.countInfectedCustomers++
            } 
            if (lastStatus.isHealthy) {
                stat.countHealthyCustomers++
            } 
            if (lastStatus.isVaccinated) {
                stat.countVaccinatedCustomers++
            } 
            if (lastStatus.isRecovered) {
                stat.countRecoveredCustomers++
            } 
            if (lastStatus.isPossiblyInfected) {
                stat.countPossiblyInfectedCustomers++
            } 
        }
    }

    return res.status(200).send(stat) 
}

module.exports = get