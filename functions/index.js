const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('dotenv').config();
const {dbName, keyFileName} = process.env;

const serviceAccount = require(keyFileName);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${dbName}.firebaseio.com`
});

const app = require('./src/App');

exports.api = functions.https.onRequest(app);
