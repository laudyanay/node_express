const express = require('express');
const router = express.Router();

const celebs = require('./celebs.js');

router.use('/celebs', celebs);

module.exports = router;