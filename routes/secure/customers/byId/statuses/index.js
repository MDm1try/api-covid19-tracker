const express = require('express')
const byId = require('./byId')

const router = express.Router({ mergeParams: true })

router.use('/:statusId', byId)

module.exports = router
