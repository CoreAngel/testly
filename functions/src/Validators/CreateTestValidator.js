const {
    answersSchema,
    descriptionSchema,
    questionsSchema,
    nameSchema,
    passwordSchema,
    typeSchema,
    questionSchema: questionTextSchema,
} = require('./Schemas');
const { Validator } = require('./Validator');

const CreateTestValidator = obj => {
    const testSchema = {
        name: nameSchema(true),
        type: typeSchema(true),
        password: passwordSchema(false),
        questions: questionsSchema(true),
    };

    const questionSchema = {
        q: questionTextSchema(true),
        a: answersSchema(true),
        d: descriptionSchema(false),
    };

    const errors = Validator(obj, testSchema);

    if (Object.prototype.hasOwnProperty.call(obj, 'questions')) {
        const questionsErrors = obj.questions
            .map((item, index) => {
                const questionErrors = Validator(item, questionSchema);
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
            errors.questionsItems = questionsErrors;
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
