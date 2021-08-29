const router = require('express').Router();
const { v4: uuidv4 } = require('uuid')

const { createNewNote, deleteNote } = require('../../lib/notes.js');
const { notes } = require('../../db/db.json');

// retrieves the notes to be displayed by the site
router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

// route that allows a new note to be added to the database and also adds a unique id
router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

    const note = createNewNote(req.body, notes);

    res.json(note);
});

// route that deletes a note based on it's unique id
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);

    res.json(notes);
});

module.exports = router;