require('dotenv').config()

const cron = require('node-cron')
const mongoose = require('mongoose')

const sendNotifications = require('./sendNotifications')

// cron.schedule('* * * * *', () => {
console.log('\n running a task every two minuteste')
    
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected')
        await sendNotifications()

        console.log('close connection')
        await mongoose.connection.close()

    })
    .catch(err => {
        console.error('error', err)
        mongoose.connection.close()
    })
// })






