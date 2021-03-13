const express = require('express')
const update = require('./get')

const router = express.Router()

router.get('/:token', update)

module.exports = router
