const moment = require('moment')

const UserStatuses = require('../../../../../../models/UserStatuses')
const UserLocations = require('../../../../../../models/UserLocations')
const Users = require('../../../../../../models/Users')
const Notifications = require('../../../../../../models/Notifications')
const inputUpdateUserStatus = require('../../../../../../validation/inputUpdateUserStatus')
const { USER_TYPES, MAX_DIST_PATHOGEN_BEARING_TRAVEL_DURING_SNEEZES_M, NOTIFICATION_STATUSES } = require('../../../../../../utils/constants')
const { getDistanceFromLatLonInMeters } = require('../../../../../../utils/geometry')

const update = async (req, res) => {
    const statusId = req.params.statusId
    try {
        const {
            isValid,
            error
        } = inputUpdateUserStatus(req.body)
        if (!isValid) {
            return res.status(400).send({ error }) 
        }
        
        const {
            isInfected,
            isHealthy,
            isVaccinated,
            isRecovered,
            isPossiblyInfected,
            hours
        } = req.body
        const userStatus = await UserStatuses.findById(statusId)

        if (!userStatus) {
            return res.status(404).send({ error: 'User Status is not found' }) 
        }
    
        await userStatus.updateOne({
            isInfected,
            isHealthy,
            isVaccinated,
            isRecovered,
            isPossiblyInfected,
        })

        const fromDate = moment(new Date()).subtract(hours, 'hours').utc().toISOString()

        const customers = await Users.find({ type: USER_TYPES.CUSTOMER })
        const healthyCustomers = []

        for (const customer of customers) {
            const lastStatus = await UserStatuses.findOne({ userId: customer._id }, null, { sort: { createdAt: -1 } })
            if (!lastStatus || (lastStatus && !lastStatus.isInfected)) {
                healthyCustomers.push(customer)
            }
        }

        const infectedCustomerLocations = await UserLocations.find({
            userId: userStatus.userId,
            createdAt: { $gte: fromDate }
        })
        
        const result = {}
        for (const healthyCustomer of healthyCustomers) {
            const healthyCustomerLocations = await UserLocations.find({ userId: healthyCustomer._id, createdAt: { $gte: fromDate } })
            
            for (const healthyCustomerLocation of healthyCustomerLocations) {
                for (const infectedCustomerLocation of infectedCustomerLocations) {
                    const dist = getDistanceFromLatLonInMeters(healthyCustomerLocation.latitude, healthyCustomerLocation.longitude, infectedCustomerLocation.latitude, infectedCustomerLocation.longitude)
                    const duration = moment.duration(moment(healthyCustomerLocation.timestamp).diff(infectedCustomerLocation.timestamp))
                    const minutes = Math.abs(duration.asMinutes())
    
                    if (MAX_DIST_PATHOGEN_BEARING_TRAVEL_DURING_SNEEZES_M >= dist && 10 >= minutes ) {
                        const userId = healthyCustomerLocation.userId
                        if (result[userId]) {
                            result[userId].numberOfContacts++
                        } else {
                            result[userId] = {
                                userId,
                                numberOfContacts: 1
                            }
                        }
                    }
                }
            }
        }

        const customersContactedByInfected = Object.values(result)

        for(const customer of customersContactedByInfected) {
            const qty = customer.numberOfContacts
            await Notifications.create({
                toUser: customer.userId,
                message: `You have been close to ${qty > 1 ? `${qty} persons` : 'a person'} infected with COVID-19`,
                status: qty > 1 ? NOTIFICATION_STATUSES.MAJOR : NOTIFICATION_STATUSES.MEDIUM
            })
        }

        return res.status(200).send({ success: true }) 
    } catch (err) {
        return res.status(500).send({ error: err.message }) 

    }
}

module.exports = update
