const express = require('express');
const {IndexController} = require('../controller/index.controller');
const router = express.Router();

router.get('/', IndexController);

module.exports = router;
