const {
    mustBeType,
    mustBeMax,
    mustBeMin,
    isSet,
    mustBeOneOf,
    mustBeBetween,
    mustBeAlphanum,
    mustBeNotEmpty,
} = require('./Utils');

const testIdSchema = required => {
    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Test ID is required');
        }

        if (isSet(value)) {
            if (!mustBeAlphanum(value)) errors.push('Test ID has wrong value');
        }

        return errors;
    };
};

const nameSchema = required => {
    const min = 2;
    const max = 16;

    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Name is required');
        }

        if (isSet(value)) {
            if (!mustBeType(value, 'string')) {
                errors.push('Name must be a string');
                return errors;
            }
            if (!mustBeBetween(value, min, max))
                errors.push(`Name length must be between ${min} and ${max} characters`);
            if (!mustBeAlphanum(value, true)) errors.push(`Name must contains a-z, A-Z, 0-9 and space`);
        }

        return errors;
    };
};

const passwordSchema = required => {
    const min = 4;
    const max = 16;

    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Password is required');
        }

        if (isSet(value)) {
            if (!mustBeType(value, 'string')) {
                errors.push('Password must be a string');
                return errors;
            }
            if (!mustBeBetween(value, min, max))
                errors.push(`Password length must be between ${min} and ${max} characters`);
        }

        return errors;
    };
};

const typeSchema = required => {
    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Type is required');
        }

        if (isSet(value)) {
            if (!mustBeOneOf(value, ['single', 'multi'])) errors.push('Type has wrong value');
        }

        return errors;
    };
};

const questionsSchema = required => {
    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Questions is required');
        }

        if (isSet(value)) {
            if (!mustBeType(value, 'array')) {
                errors.push('Questions must be a array');
                return errors;
            }
            if (!mustBeNotEmpty(value)) errors.push('Questions cannot be empty');
        }

        return errors;
    };
};

const questionIdSchema = required => {
    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Question id is required');
        }

        if (isSet(value)) {
            if (!mustBeType(value, 'number')) {
                errors.push('Question id must be a number');
                return errors;
            }
            if (!mustBeMin(value, 0)) errors.push('Question id cannot be negative');
        }

        return errors;
    };
};

const questionSchema = required => {
    const max = 400;

    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Question is required');
        }

        if (isSet(value)) {
            if (!mustBeType(value, 'string')) {
                errors.push('Question must be a string');
                return errors;
            }
            if (!mustBeNotEmpty(value)) errors.push('Question cannot be empty');
            if (!mustBeMax(value, max)) errors.push(`Question max length is ${max} characters`);
        }

        return errors;
    };
};

const descriptionSchema = required => {
    const max = 250;

    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Description is required');
        }

        if (isSet(value)) {
            if (!mustBeType(value, 'string')) {
                errors.push('Description must be a string');
                return errors;
            }
            if (!mustBeNotEmpty(value)) errors.push('Description cannot be empty');
            if (!mustBeMax(value, max)) errors.push(`Description max length is ${max} characters`);
        }

        return errors;
    };
};

const answersSchema = required => {
    const max = 200;

    return value => {
        const errorsObj = {
            errors: [],
            answers: [],
        };

        if (required) {
            if (!isSet(value)) errorsObj.errors.push('Answers is required');
        }

        if (!isSet(value)) {
            return errorsObj;
        }

        if (!mustBeType(value, 'array')) {
            errorsObj.errors.push('Answers must be a array');
            return errorsObj;
        }
        if (!mustBeNotEmpty(value)) {
            errorsObj.errors.push('Answers list cannot be empty');
            return errorsObj;
        }

        const isAtLeastOneOfItemCorrect = value.some(({ c }) => c === true || c === null);
        if (!isAtLeastOneOfItemCorrect) errorsObj.errors.push('At least one of the answers must be correct');

        value.forEach(({ i, c }, index) => {
            const position = index;
            const answerError = [];
            if (!isSet(i)) answerError.push(`Answer is required`);
            if (!mustBeNotEmpty(i)) answerError.push(`Answer cannot be empty`);
            if (!mustBeMax(i, max)) answerError.push(`Answer max length is ${max} characters`);
            if (isSet(c)) {
                if (!mustBeOneOf(c, [true, null])) answerError.push(`Answer correct field is wrong type`);
            }
            if (answerError.length !== 0) {
                errorsObj.answers.push({
                    position,
                    errors: answerError,
                });
            }
        });

        if (errorsObj.errors.length !== 0 || errorsObj.answers.length !== 0) {
            return errorsObj;
        }
        return {};
    };
};

module.exports = {
    testIdSchema,
    nameSchema,
    passwordSchema,
    typeSchema,
    questionsSchema,
    questionIdSchema,
    questionSchema,
    descriptionSchema,
    answersSchema,
};
