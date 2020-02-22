const admin = require('firebase-admin');
const db = admin.firestore();
const testCollection = db.collection('test');
const { CreateTestValidator } = require('./../Validators/CreateTestValidator');
const { GetTestValidator } = require('./../Validators/GetTestValidator');
const { CheckPasswordValidator } = require('./../Validators/CheckPasswordValidator');
const { hashPassword, comparePassword } = require('./../Utils/Crypto');

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

const getTest = async (req, res) => {
    const { id } = req.params;

    const errors = GetTestValidator({ key: id });

    if (errors !== null) {
        return res.status(400).send(errors);
    }

    try {
        const doc = await testCollection.doc(id).get();
        if (!doc.exists) {
            return res.status(404).send();
        } else {
            const test = doc.data();
            test.key = id;

            delete test.index;
            if (test.password) {
                test.protected = true;
                delete test.password;
            }
            return res.status(200).send(test);
        }
    } catch (e) {
        return res.status(500).send();
    }
};

const checkPassword = async (req, res) => {
    const obj = req.body;

    const errors = CheckPasswordValidator(obj);

    if (errors !== null) {
        return res.status(400).send(errors);
    }

    try {
        const doc = await testCollection.doc(obj.key).get();
        if (!doc.exists) {
            return res.status(401).send();
        } else {
            const test = doc.data();
            const { password } = test;

            const status = await comparePassword(obj.password, password);

            if (status) {
                return res.status(200).send();
            } else {
                return res.status(401).send();
            }
        }
    } catch (e) {
        return res.status(500).send();
    }
};

module.exports = {
    createTest,
    getTest,
    checkPassword,
};
