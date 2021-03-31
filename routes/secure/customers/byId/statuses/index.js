const express = require('express')
const byId = require('./byId')
const last = require('./last')

const { authenticate } = require('../../../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/:statusId', authenticate('admin'), byId)
router.use('/last', last)

module.exports = router
