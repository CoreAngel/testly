import { runTypes } from 'static/run';
import { shuffle } from 'utils/array';

const prepareQuestions = (testQuestions, runType) => {
    if (runType === runTypes.Q_RANDOM_A_ORDERED || runType === runTypes.Q_RANDOM_A_RANDOM) {
        return shuffle(testQuestions);
    }

    return testQuestions;
};

const prepareAnswers = (testQuestions, runType) => {
    if (runType !== runTypes.Q_ORDERED_A_RANDOM && runType !== runTypes.Q_RANDOM_A_RANDOM) {
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

export const prepareTest = testQuestions => {
    const runType = runTypes.Q_RANDOM_A_RANDOM;

    const preparedQuestions = prepareQuestions(testQuestions, runType);
    return prepareAnswers(preparedQuestions, runType);
};
