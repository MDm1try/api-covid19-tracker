const moment = require('moment')

const Locations = require('../../../models/Locations')
const UserLocations = require('../../../models/UserLocations')

const { COVID_SURVIVE_HOURS } = require('../../constants')
const { getDistanceFromLatLonInMeters } = require('../../geometry')

const findСustomersInInfectedPlaces = async (from) => {
    const dateQuery = from ? { createdAt: { $gte: from } } : {}

    const result = {} 

    const userLocations = await UserLocations.find(dateQuery) 
    const locations = await Locations.find()
    for (const location of locations) {
        for (const userLocation of userLocations) {
            const dist = getDistanceFromLatLonInMeters(location.latitude, location.longitude, userLocation.latitude, userLocation.longitude)
            const userLocationTimestamp = new Date(userLocation.timestamp).toISOString()
            const locationTimestamp = location.createdAt

            const duration = moment.duration(moment(userLocationTimestamp).diff(locationTimestamp))
            const hours = Math.abs(duration.asHours())
            const milliseconds = Math.abs(duration.asMilliseconds())
            if (location.radius >= dist && COVID_SURVIVE_HOURS >= hours) {
                const userId = userLocation.userId
                if (result[userId]) {
                    result[userId].locations = [...result[userId].locations, {
                        name: location.name,
                        timeAfter: moment.utc(milliseconds).format('HH:mm')                        ,
                    }]
                    
                } else {
                    result[userId] = {
                        userId: userLocation.userId,
                        locations: [{
                            name: location.name,
                            timeAfter: moment.utc(milliseconds).format('HH:mm')                        ,
                        }],
                    }
                }
            }
        }
    }

    return Object.values(result)
}   

module.exports = findСustomersInInfectedPlaces