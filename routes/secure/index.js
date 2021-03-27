const express = require('express')
const customers = require('./customers')
const locations = require('./locations')

const { authenticate } = require('../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/locations', locations)
router.use('/customers', authenticate('admin'), customers)

module.exports = router
