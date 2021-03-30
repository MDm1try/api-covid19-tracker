const express = require('express')
const get = require('./get')
const byId = require('./byId')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.use('/:notificationId', byId)

module.exports = router
