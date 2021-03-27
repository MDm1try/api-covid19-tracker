const express = require('express')
const secure = require('./secure')
const auth = require('./auth')

const { authenticate } = require('../utils/auth')

const router = express.Router({ mergeParams: true })

router.use('/auth', auth)
router.use('/secure', authenticate(), secure)

module.exports = router
