const express = require('express')
const get = require('./get')
const statuses = require('./statuses')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.use('/statuses', statuses)

module.exports = router
