import { runTypes } from 'static/run';
import { shuffle } from 'utils/array';

const prepareQuestions = (testQuestions, runType) => {
    if (runType === runTypes.RANDOM) {
        return shuffle(testQuestions);
    }

    return testQuestions;
};

const prepareAnswers = (testQuestions, runType) => {
    if (runType !== runTypes.ORDERED) {
        return testQuestions.map(item => ({
            ...item,
            fails: 0,
        }));
    }

    return testQuestions
        .map(item => {
            const { a, c } = item;
            return {
                ...item,
                a: a.map((aItem, aIndex) => ({
                    a: aItem,
                    c: aIndex === c,
                })),
                fails: 0,
            };
        })
        .map(item => {
            return {
                ...item,
                a: shuffle(item.a),
            };
        })
        .map(item => {
            const aCorrectIndex = item.a.findIndex(aItem => aItem.c);
            return {
                ...item,
                a: item.a.map(aItem => aItem.a),
                c: aCorrectIndex,
            };
        });
};

export const prepareTest = (testQuestions, options) => {
    const { answers, questions } = options;

    const preparedQuestions = prepareQuestions(testQuestions, questions);
    return prepareAnswers(preparedQuestions, answers);
};
