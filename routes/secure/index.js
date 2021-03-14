const express = require('express')
const customers = require('./customers')

const { authenticate } = require('../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/customers', authenticate('admin'), customers)

module.exports = router
