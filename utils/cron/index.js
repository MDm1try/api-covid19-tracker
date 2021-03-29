require('dotenv').config()

const cron = require('node-cron')
const mongoose = require('mongoose')
const moment = require('moment')

const sendNotifications = require('./sendNotifications')

cron.schedule('*/10 * * * *', () => {
    console.log('\n running a task every 10 minute')

    const fromDate = moment(new Date()).subtract(10, 'minutes').utc().toISOString()

    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log('Connected', fromDate)
            await sendNotifications(fromDate)

            console.log('close connection')
            await mongoose.connection.close()

        })
        .catch(err => {
            console.error('error', err)
            mongoose.connection.close()
        })
})






