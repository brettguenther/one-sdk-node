const express = require('express');
const path = require('path');

const app = express();

const { getSessionToken } = require('./frankie');

// Set up Pug as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('index')
});

app.get('/modular-forms', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        return res.render('modular-forms',{ sessionToken });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});


app.get('/biometrics', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        return res.render('biometrics',{ sessionToken });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/success', (req, res) => {
    res.render('success');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});