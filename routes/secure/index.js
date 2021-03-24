const express = require('express')
const customers = require('./customers')
const locations = require('./locations')

const { authenticate } = require('../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/customers', authenticate('admin'), customers)
router.use('/locations', authenticate('admin'), locations)

module.exports = router
