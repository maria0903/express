const express = require('express');
const { getNotes, insertNotes } = require('../controller/notes_from_b.controller');
const router = express.Router();

router.get('/', getNotes);
router.post('/insert', insertNotes)

module.exports = router;
