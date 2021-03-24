const express = require('express')

const remove = require('./remove')
const get = require('./get')

const router = express.Router({ mergeParams: true })

router.get('/', get)
router.delete('/', remove)

module.exports = router
