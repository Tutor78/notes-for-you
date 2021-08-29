const express = require('express');
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/db.json');

function createNewNote(body, notesArray) {
    const note = body;

    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
};

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id == id) {
            notesArray.splice(i, 1);
        };
    };

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
};

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/api/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();

    const note = createNewNote(req.body, notes);

    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);

    res.json(notes);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now running on port ${PORT}.`);
});


