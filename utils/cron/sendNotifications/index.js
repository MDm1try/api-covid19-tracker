const Notifications = require('../../../models/Notifications')
const findСustomersInInfectedPlaces = require('./findСustomersInInfectedPlaces')
const findCustomersContactedByInfected = require('./findCustomersContactedByInfected')
const { NOTIFICATION_STATUSES } = require('../../constants')

const sendsendNotifications = async (from) => {
    const customersInInfectedPlaces = await findСustomersInInfectedPlaces(from)
    const customersContactedByInfected = await findCustomersContactedByInfected(from)
    console.log('\ncustomersInInfectedPlaces', customersInInfectedPlaces.length)
    console.log('customersContactedByInfected', customersContactedByInfected.length)

    for(const customer of customersInInfectedPlaces) {
        const locations = customer.locations
        await Promise.all(locations.map(location => Notifications.create({
            toUser: customer.userId,
            message: `You have visited "${location.name}" place ${location.timeAfter} hour(s) ago where people got infected with COVID-19.`,
            status: NOTIFICATION_STATUSES.MINOR
        })))
    }

    for(const customer of customersContactedByInfected) {
        const qty = customer.numberOfContacts
        await Notifications.create({
            toUser: customer.userId,
            message: `You have been close to ${qty > 1 ? `${qty} persons` : 'a person'} infected with COVID-19`,
            status: qty > 1 ? NOTIFICATION_STATUSES.MAJOR : NOTIFICATION_STATUSES.MEDIUM
        })
    }
}

module.exports = sendsendNotifications