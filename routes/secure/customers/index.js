const express = require('express')
const get = require('./get')
const byId = require('./byId')
const { authenticate } = require('../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/:id', byId)
router.get('/', authenticate('admin'), get)

module.exports = router
