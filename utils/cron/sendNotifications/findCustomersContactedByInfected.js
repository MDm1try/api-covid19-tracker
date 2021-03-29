const moment = require('moment')

const UserLocations = require('../../../models/UserLocations')
const Users = require('../../../models/Users')
const UserStatuses = require('../../../models/UserStatuses')

const { MAX_DIST_PATHOGEN_BEARING_TRAVEL_DURING_SNEEZES_M, USER_TYPES } = require('../../constants')
const { getDistanceFromLatLonInMeters } = require('../../geometry')

const findCustomersContactedByInfected = async (from) => {
    const result = {} 
    
    const dateQuery = from ? { createdAt: { $gte: { $date: from } } } : {}

    const customers = await Users.find({ type: USER_TYPES.CUSTOMER })
    const infectedCustomers = []
    const healthyCustomers = []
    for (const customer of customers) {
        const lastStatus = await UserStatuses.findOne({ userId: customer._id }, null, { sort: { createdAt: -1 } })
        if (lastStatus && lastStatus.isInfected) {
            infectedCustomers.push(customer)
        } else if (!lastStatus || (lastStatus && !lastStatus.isInfected)) {
            healthyCustomers.push(customer)
        }
    }

    
    const infectedCustomerLocationsArrays = await Promise.all(infectedCustomers.map(customer => UserLocations.find({
        userId: customer._id,
        ...dateQuery
    })))

    const infectedCustomerLocations = infectedCustomerLocationsArrays.reduce((prev, curr) => [...prev, ...curr], [])
    
    for (const healthyCustomer of healthyCustomers) {
        const healthyCustomerLocations = await UserLocations.find({ userId: healthyCustomer._id, ...dateQuery })
        
        for (const healthyCustomerLocation of healthyCustomerLocations) {
            for (const infectedCustomerLocation of infectedCustomerLocations) {
                const dist = getDistanceFromLatLonInMeters(healthyCustomerLocation.latitude, healthyCustomerLocation.longitude, infectedCustomerLocation.latitude, infectedCustomerLocation.longitude)
                const duration = moment.duration(moment(healthyCustomerLocation.timestamp).diff(infectedCustomerLocation.timestamp))
                const minutes = Math.abs(duration.asMinutes())
               
                if (MAX_DIST_PATHOGEN_BEARING_TRAVEL_DURING_SNEEZES_M >= dist && 1 >= minutes ) {
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

    return Object.values(result)
}   

module.exports = findCustomersContactedByInfected