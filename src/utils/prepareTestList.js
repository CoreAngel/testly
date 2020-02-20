import { runTypes } from 'static/run';
import { shuffle } from 'utils/array';

const prepareQuestions = (testQuestions, runType) => {
    if (runType === runTypes.RANDOM) {
        return shuffle(testQuestions);
    }

    return testQuestions;
};

const prepareAnswers = (testQuestions, runType) => {
    if (runType !== runTypes.RANDOM) {
        return testQuestions.map(item => ({
            ...item,
            a: shuffle(item.a),
        }));
    }

    return testQuestions;
};

export const prepareTest = (testQuestions, options) => {
    const { answers, questions } = options;

    const preparedQuestions = prepareQuestions(testQuestions, questions);
    return prepareAnswers(preparedQuestions, answers);
};

export const clearList = testQuestions => {
    const list = [...testQuestions];

    return list.map(item => {
        const copyItem = { ...item };
        delete copyItem.f;

        const answers = copyItem.a.map(aItem => {
            const copyAItem = { ...aItem };
            delete copyAItem.s;
            return copyAItem;
        });

        return {
            ...copyItem,
            a: answers,
        };
    });
};
