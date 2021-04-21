const express = require('express')
const get = require('./get')

const { authenticate } = require('../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.get('/', authenticate('admin'), get)

module.exports = router
