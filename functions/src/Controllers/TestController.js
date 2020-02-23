const admin = require('firebase-admin');
const db = admin.firestore();
const testCollection = db.collection('test');
const { CreateTestValidator } = require('./../Validators/CreateTestValidator');
const { GetTestValidator } = require('./../Validators/GetTestValidator');
const { CheckPasswordValidator } = require('./../Validators/CheckPasswordValidator');
const { CreateTestDto } = require('./../Dto/CreateTestDto');
const { hashPassword, comparePassword } = require('./../Utils/Crypto');

const createTest = async (req, res) => {
    const body = req.body;
    const errors = CreateTestValidator(body);

    if (errors !== null) {
        return res.status(400).send(errors);
    }

    const { name, password, type, questions } = CreateTestDto(body);

    const questionsWithIds = questions.map((item, index) => {
        item.id = index;
        return item;
    });

    const testToSave = {
        name,
        type,
        index: questionsWithIds.length,
        questions: questionsWithIds,
    };

    if (password) {
        testToSave.password = await hashPassword(password);
    }

    try {
        const { id } = await testCollection.add(testToSave);
        return res.status(200).send({
            name,
            type,
            key: id,
            protected: Boolean(password),
            questions: questionsWithIds,
        });
    } catch (e) {
        return res.status(500).send();
    }
};

const getTest = async (req, res) => {
    const { key } = req.params;

    const errors = GetTestValidator({ key });

    if (errors !== null) {
        return res.status(400).send(errors);
    }

    try {
        const doc = await testCollection.doc(key).get();
        if (!doc.exists) {
            return res.status(404).send();
        } else {
            const { name, type, questions, password } = doc.data();
            return res.status(200).send({
                name,
                type,
                key,
                protected: Boolean(password),
                questions,
            });
        }
    } catch (e) {
        return res.status(500).send();
    }
};

const checkPassword = async (req, res) => {
    const { key, password } = req.body;

    const errors = CheckPasswordValidator({ key, password });

    if (errors !== null) {
        return res.status(400).send(errors);
    }

    try {
        const doc = await testCollection.doc(key).get();
        if (!doc.exists) {
            return res.status(401).send();
        } else {
            const test = doc.data();
            const { password: hash } = test;

            const status = await comparePassword(password, hash);

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
