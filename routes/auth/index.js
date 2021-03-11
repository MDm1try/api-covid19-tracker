const express = require('express')
const login = require('./login')
const registration = require('./registration')
const invite = require('./invite')

const router = express.Router()

router.use('/login', login)
router.use('/registration', registration)
router.use('/invite', invite)

module.exports = router
