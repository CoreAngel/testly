import { arrayOf, string, number, shape, oneOf, bool, oneOfType, node } from 'prop-types';
import { runTypes } from 'static/run';
import { answerType, testType } from 'static/list';

export const answerProp = shape({
    i: string.isRequired,
    c: oneOf([answerType.Correct, answerType.NotSure]),
    s: bool,
});

export const typeListProp = oneOf([testType.Single, testType.Multi]);

export const listQuestionListProps = arrayOf(
    shape({
        id: number.isRequired,
        q: string.isRequired,
        a: arrayOf(answerProp).isRequired,
    }),
);

export const listProps = shape({
    name: string.isRequired,
    key: string.isRequired,
    type: typeListProp.isRequired,
    list: listQuestionListProps.isRequired,
});

export const testQuestionListProps = arrayOf(
    shape({
        id: number.isRequired,
        q: string.isRequired,
        a: arrayOf(answerProp).isRequired,
        f: bool,
    }),
);

export const testProps = shape({
    name: string.isRequired,
    key: string.isRequired,
    type: typeListProp.isRequired,
    list: testQuestionListProps.isRequired,
    index: number.isRequired,
});

export const optionOrderProps = oneOf([runTypes.RANDOM, runTypes.ORDERED]);

export const optionsProps = shape({
    questions: optionOrderProps.isRequired,
    answers: optionOrderProps.isRequired,
    animationTime: number.isRequired,
    animation: bool.isRequired,
});

export const childrenProp = oneOfType([arrayOf(node), node]);
