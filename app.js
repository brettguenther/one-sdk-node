const express = require('express');
const path = require('path');

const app = express();

const { getSessionToken } = require('./frankie');


// Set up Pug as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the index.pug template
app.get('/', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        res.render('index',{ sessionToken });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});