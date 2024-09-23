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

app.get('/manual-forms', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        return res.render('manual-forms',{ title: "FrankieOne eKYC Flow", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/idv-flow', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        // console.log(`sessionToken: ${sessionToken}`)
        return res.render('idv-flow',{ title: "FrankieOne IDV Flow", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/ocr-flow', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        // console.log(`sessionToken: ${sessionToken}`)
        return res.render('ocr-flow',{ title: "FrankieOne OCR Flow", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/split-flow', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        return res.render('split-flow',{ title: "FrankieOne Split Flow", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/split-flow-alt', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        return res.render('ocr-idv-prebio',{ title: "FrankieOne Split Flow with IDV Pre Bio", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});


app.get('/split-flow-nz', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        return res.render('split-flow-nz',{ title: "FrankieOne Split Flow ", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/manual-multistep-flow', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        // console.log(`sessionToken: ${sessionToken}`)
        return res.render('manual-forms-multistep',{ title: "FrankieOne Multistep Flow", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/manual-intl', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        // console.log(`sessionToken: ${sessionToken}`)
        return res.render('manual-forms-intl',{ title: "FrankieOne International Flow", sessionToken, googleApiKey });
    } catch {
        console.error('Error getting session token');
        res.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/idv-multi', async (req, res) => {
    try {
        const customerId = req.query.customerId; // Extract the customerId query parameter
        const sessionToken = await getSessionToken(customerId);
        const googleApiKey = process.env.GOOGLE_API_KEY;
        // console.log(`sessionToken: ${sessionToken}`)
        return res.render('idv-flow-multi-doc',{ title: "FrankieOne IDV Flow Multi Doc", sessionToken, googleApiKey });
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

const PORT = process.env.PORT || 3000;

// Start the server: use https module if dev, express if prod

if (process.env.NODE_ENV === 'development') { 
    // Load the self-signed certificate and key
    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };
    https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
        console.log(`HTTPS Server running on https://0.0.0.0:${PORT}`);
    });
    
    http.createServer(app).listen(80);
    // Create an HTTPS service identical to the HTTP service.
    https.createServer(options, app).listen(443);
} else {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}