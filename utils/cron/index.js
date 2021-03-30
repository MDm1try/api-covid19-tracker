require('dotenv').config()

const cron = require('node-cron')
const mongoose = require('mongoose')
const moment = require('moment')

const sendNotifications = require('./sendNotifications')

let error = false 
const task = cron.schedule('*/5 * * * *',  async () => {
    try {
        console.info('\n running a task every 5 minute')

        const fromDate = moment(new Date()).subtract(10, 'minutes').utc().toISOString()

        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.info('Open connetion', fromDate)

        await sendNotifications(fromDate)

        console.info('close connection')
        await mongoose.connection.close()
    } catch (err) {
        error = true
        console.error(err)
        mongoose.connection.close()
        if (task) {
            task.stop()
            console.info('stop cron job')
        }
    }
})


if (error) {
    task.destroy()
}






