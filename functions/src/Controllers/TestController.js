const admin = require('firebase-admin');
const db = admin.firestore();
const testCollection = db.collection('test');
const { CreateTestValidator } = require('./../Validators/CreateTestValidator');
const { hashPassword } = require('./../Utils/Crypto');

const createTest = async (req, res) => {
    const test = req.body;

    const errors = CreateTestValidator(test);

    if (errors !== null) {
        return res.status(400).send(errors);
    }

    test.list = test.list.map((item, index) => {
        item.id = index;
        return item;
    });

    test.index = test.list.length;

    if (test.password) {
        test.password = await hashPassword(test.password);
    }

    try {
        const ref = await testCollection.add(test);
        test.key = ref.id;
    } catch (e) {
        return res.status(500).send();
    }

    if (test.password) {
        test.protected = true;
        delete test.password;
    }

    delete test.index;
    return res.status(200).send(test);
};

module.exports = {
    createTest,
};
