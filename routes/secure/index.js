const express = require('express')
const customers = require('./customers')
const locations = require('./locations')
const statistics = require('./statistics')

const router = express.Router({ mergeParams: true })

router.use('/locations', locations)
router.use('/customers', customers)
router.use('/statistics', statistics)

module.exports = router
