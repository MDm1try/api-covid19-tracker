require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const winston = require('winston')
const expressWinston = require('express-winston')

const routes = require('./routes')

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(winston.format.colorize(), winston.format.json()),
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function () {
                return false
            }, // optional: allows to skip some log messages based on request and/or response
        }),
    )

    app.use('/api/v1', routes)

    app.listen(process.env.PORT, () => {
        console.log('listening on ' + process.env.PORT)
    })
}).catch(err => console.log(err.reason))
