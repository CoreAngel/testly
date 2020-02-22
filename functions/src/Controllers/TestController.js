const admin = require('firebase-admin');
const db = admin.firestore();
const testCollection = db.collection('test');
const { CreateTestValidator } = require('./../Validators/CreateTestValidator');

const createTest = async (req, res) => {
    const obj = req.body;

    const errors = CreateTestValidator(obj);

    // const ref = await testCollection.add(obj);
    res.send(errors);
};

module.exports = {
    createTest,
};
