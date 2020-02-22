const {
    answersSchema,
    descriptionSchema,
    listSchema,
    nameSchema,
    passwordSchema,
    typeSchema,
    questionSchema,
} = require('./Schemas');
const { Validator } = require('./Validator');

const CreateTestValidator = obj => {
    const testSchema = {
        name: nameSchema(true),
        type: typeSchema(true),
        password: passwordSchema(false),
        list: listSchema(true),
    };

    const questionsSchema = {
        q: questionSchema(true),
        a: answersSchema(true),
        d: descriptionSchema(false),
    };

    const errors = Validator(obj, testSchema);

    if (Object.prototype.hasOwnProperty.call(obj, 'list')) {
        const questionsErrors = obj.list
            .map((item, index) => {
                const questionErrors = Validator(item, questionsSchema);
                if (Object.entries(questionErrors).length !== 0) {
                    return {
                        position: index + 1,
                        errors: questionErrors,
                    };
                }
                return null;
            })
            .filter(item => item !== null);

        if (questionsErrors.length !== 0) {
            errors.questions = questionsErrors;
        }
    }

    if (Object.entries(errors).length !== 0) {
        return errors;
    }

    return null;
};

module.exports = {
    CreateTestValidator,
};
