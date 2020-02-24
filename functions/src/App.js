const express = require('express');
const cors = require('cors');
const TestController = require('./Controllers/TestController');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/test', TestController.createTest);
app.get('/tests/:key', TestController.getTest);
app.get('/tests/:key/name', TestController.getTestName);
app.post('/test/password', TestController.checkPassword);

module.exports = app;