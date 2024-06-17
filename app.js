const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();

const { getSessionToken } = require('./frankie');

// Set up Pug as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('dotenv').config()

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('index')
});

// Load the self-signed certificate and key
// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// };

app.get('/manual-forms', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        const googleApiKey = process.env.GOOGLE_API_KEY;
        return res.render('manual-forms',{ sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/idv-flow', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        const googleApiKey = process.env.GOOGLE_API_KEY;
        // console.log(`sessionToken: ${sessionToken}`)
        return res.render('idv-flow',{ sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/split-flow', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        const googleApiKey = process.env.GOOGLE_API_KEY;
        return res.render('split-flow',{ sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/welcome', (req, res) => {
    res.render('welcome');
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.get('api/token', async (req, res) => {
    try {
        const sessionToken = await getSessionToken();
        res.json({ sessionToken });
    } catch {
        console.error('Error getting session token');
        return;
    }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
//     console.log(`HTTPS Server running on https://0.0.0.0:${PORT}`);
//   });

// http.createServer(app).listen(80);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);