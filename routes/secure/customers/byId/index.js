const express = require('express')
const get = require('./get')
const statuses = require('./statuses')
const notifications = require('./notifications')

const { authenticate } = require('../../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.get('/', authenticate('admin'), get)
router.use('/statuses', authenticate('admin'), statuses)
router.use('/notifications', notifications)

module.exports = router
