// app.js
const express = require('express');
const app = express();

// Middleware 1: Request Logging Middleware
function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
    next();  // Pass control to the next middleware
}

// Middleware 2: Custom Response Header Middleware
function addCustomHeader(req, res, next) {
    res.setHeader('X-Powered-By', 'Express');
    next();  // Pass control to the next middleware
}

// Middleware 3: Request Time Measurement Middleware
function requestTimer(req, res, next) {
    const startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`Request took ${duration}ms`);
    });
    next();  // Pass control to the next middleware
}

// Apply the middleware globally
app.use(requestLogger);      // Logs request details
app.use(addCustomHeader);    // Adds custom headers to responses
app.use(requestTimer);       // Measures request time

// Define route for /
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

// Define route for /about
app.get('/about', (req, res) => {
    res.status(200).send('About us');
});

module.exports = app;
