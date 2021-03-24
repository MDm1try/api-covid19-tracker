const express = require('express')
const get = require('./get')
const create = require('./create')
const byId = require('./byId')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.post('/', create)
router.use('/:id', byId)

module.exports = router
