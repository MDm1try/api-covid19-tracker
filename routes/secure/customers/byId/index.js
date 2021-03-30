const express = require('express')
const get = require('./get')
const statuses = require('./statuses')
const notifications = require('./notifications')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.use('/statuses', statuses)
router.use('/notifications', notifications)

module.exports = router
