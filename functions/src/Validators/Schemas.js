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
    const max = 250;

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
    const max = 200;

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
    const max = 150;

    return value => {
        const errors = [];

        if (required) {
            if (!isSet(value)) errors.push('Answers is required');
        }

        if (!isSet(value)) {
            return errors;
        }

        if (!mustBeType(value, 'array')) {
            errors.push('Answers must be a array');
            return errors;
        }
        if (!mustBeNotEmpty(value)) {
            errors.push('Answers list cannot be empty');
            return errors;
        }

        const isAtLeastOneOfItemCorrect = value.some(({ c }) => c === true || c === null);
        if (!isAtLeastOneOfItemCorrect) errors.push('At least one of the answers must be correct');

        value.forEach(({ i, c }, index) => {
            const position = index + 1;
            if (!isSet(i)) errors.push(`Answer ${position}: is required`);
            if (!mustBeNotEmpty(i)) errors.push(`Answer ${position}: cannot be empty`);
            if (!mustBeMax(i, max)) errors.push(`Answer ${position}: max length is ${max} characters`);
            if (isSet(c)) {
                if (!mustBeOneOf(c, [true, null])) errors.push(`Answer ${position}: correct field is wrong type`);
            }
        });

        return errors;
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
