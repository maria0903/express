const express = require('express');
const { GenerateCat, GenerateDog } = require('../controller/random.controller');
const router = express.Router();

router.get('/cat', GenerateCat);
router.get('/dog', GenerateDog);

module.exports = router;
