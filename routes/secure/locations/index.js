const express = require('express')
const get = require('./get')
const create = require('./create')
const byId = require('./byId')
const track = require('./track')

const { authenticate } = require('../../../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/track' , track)
router.get('/', get)
router.post('/', authenticate('admin'), create)
router.use('/:id', authenticate('admin'), byId)

module.exports = router
