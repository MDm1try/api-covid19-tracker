const express = require('express')
const get = require('./get')
const byId = require('./byId')
const { authenticate } = require('../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.get('/', authenticate('admin'), get)
router.use('/:id', byId)

module.exports = router
