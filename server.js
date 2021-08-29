const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// allows the css and js files in the public folder to be served at the same time as the html pages
app.use(express.static('public'));

// parses incoming string and array data
app.use(express.urlencoded({ extended: true }));

// parses incoming json data
app.use(express.json());

// sets the imported routes prefixes to use
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// sets the application to listen in on the available port
app.listen(PORT, () => {
    console.log(`API server now running on port ${PORT}.`);
});