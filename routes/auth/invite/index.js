const express = require('express')
const update = require('./update')

const router = express.Router()

router.put('/:token', update)

module.exports = router
