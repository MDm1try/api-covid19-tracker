const express = require('express')
const get = require('./get')
const statuses = require('./statuses')
const notifications = require('./notifications')

const { authenticate } = require('../../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/statuses', statuses)
router.use('/notifications', notifications)
router.get('/', authenticate('admin'), get)

module.exports = router
