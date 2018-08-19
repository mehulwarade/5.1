const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('certificates/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// For http
httpServer.listen(8080);
// For https
httpsServer.listen(8443);


const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(`${base}/device-list.html`);
});

app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
});

app.get('/register-device', (req, res) => {
    res.sendFile(`${base}/register-device.html`);
});
app.get('/send-command', (req, res) => {
    res.sendFile(`${base}/send-command.html`);
});
app.get('/about', (req, res) => {
    res.sendFile(`${base}/about-me.html`);
});
app.get('/registration', (req, res) => {
    res.sendFile(`${base}/registration.html`);
});

app.get('/lo', (req, res) => {
    res.sendFile(`${base}/loginwithfb.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

