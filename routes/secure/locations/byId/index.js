const express = require('express')
const remove = require('./remove')

const router = express.Router({ mergeParams: true })

router.delete('/', remove)

module.exports = router
