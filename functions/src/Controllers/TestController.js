const admin = require('firebase-admin');
const db = admin.firestore();
const testCollection = db.collection('test');

const createTest = async (req, res) => {
    res.send('test')
};

module.exports = {
    createTest
};
