const express = require('express')
const update = require('./update')

const router = express.Router({ mergeParams: true })

router.put('/', update)

module.exports = router
