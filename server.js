const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/db.json');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/api/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

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


