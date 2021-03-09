const express = require('express');
const login = require('./login');
const registration = require('./registration');

const router = express.Router();

router.use('/login', login);
router.use('/registration', registration);

module.exports = router;
