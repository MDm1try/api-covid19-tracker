const express = require('express')
const get = require('./get')
const create = require('./create')
const byId = require('./byId')

const { authenticate } = require('../../utils/auth')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.post('/', authenticate('admin'), create)
router.use('/:id', authenticate('admin'), byId)

module.exports = router
