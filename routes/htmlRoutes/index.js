const path = require('path');
const router = require('express').Router();

// serves the index file when the user gets to the url
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// serves the notes file when the user affixes /notes to the url
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// serves the index file when any other path is used in the url
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;