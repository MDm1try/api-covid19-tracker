const express = require('express')
const update = require('./update')
const get = require('./get')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.put('/', update)

module.exports = router
