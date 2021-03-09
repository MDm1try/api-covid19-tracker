const express = require('express');
const user = require('./user');

const router = express.Router({ mergeParams: true });

router.use('/user', user);

module.exports = router;
