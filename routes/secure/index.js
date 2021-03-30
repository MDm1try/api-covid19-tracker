const express = require('express')
const customers = require('./customers')
const locations = require('./locations')

const router = express.Router({ mergeParams: true })

router.use('/locations', locations)
router.use('/customers', customers)

module.exports = router
