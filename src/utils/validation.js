import { answerType } from '../static/list';

const isEmpty = value => {
    return value.length === 0;
};

const isInMax = (value, max) => {
    return value.length <= max;
};

const isBetween = (value, min, max) => {
    return value.length >= min && value.length <= max;
};

export const validateTest = test => {
    const { name, password } = test;

    const result = {
        name: {
            errors: [],
            warnings: [],
        },
        password: {
            errors: [],
            warnings: [],
        },
    };

    if (isEmpty(name)) result.name.errors.push('Name cannot be empty');
    if (!isBetween(name, 2, 16)) result.name.errors.push('Name length must be between 2 and 16 characters');

    if (!isEmpty(password)) {
        if (!isBetween(password, 4, 16))
            result.password.errors.push('Password length must be between 4 and 16 characters');
    }

    return result;
};

export const validateQuestion = question => {
    const { q, d } = question;

    const result = {
        q: {
            errors: [],
            warnings: [],
        },
        d: {
            errors: [],
            warnings: [],
        },
    };

    if (isEmpty(q)) result.q.errors.push('Question cannot be empty');
    if (!isInMax(q, 400)) result.q.warnings.push('Question max length is 400 characters');

    if (!isEmpty(d)) {
        if (!isInMax(d, 250)) result.d.warnings.push('Description max length is 250 characters');
    }

    return result;
};

export const validateAnswers = answers => {
    const result = {
        errors: [],
        warnings: [],
    };

    const isAtLeastOneCorrect = answers.some(({ c }) => c === answerType.Correct || c === answerType.NotSure);
    if (!isAtLeastOneCorrect) result.errors.push('At least one of the answers must be correct or not sure');

    return result;
};

export const validateAnswer = answer => {
    const { i } = answer;

    const result = {
        errors: [],
        warnings: [],
    };

    if (isEmpty(i)) result.errors.push('Answer cannot be empty');
    if (!isInMax(i, 200)) result.warnings.push('Answer max length is 200 characters');

    return result;
};
