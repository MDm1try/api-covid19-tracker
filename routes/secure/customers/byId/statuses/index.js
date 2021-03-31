const express = require('express')
const byId = require('./byId')
const last = require('./last')

const { authenticate } = require('../../../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/last', last)
router.use('/:statusId', authenticate('admin'), byId)

module.exports = router
