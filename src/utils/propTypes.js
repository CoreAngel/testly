import { arrayOf, string, number, shape, oneOf, bool, oneOfType, node } from 'prop-types';
import { runTypes } from 'static/run';
import { answerType, testType } from 'static/list';

export const answerProp = shape({
    i: string.isRequired,
    c: oneOf([answerType.Correct, answerType.NotSure]),
    s: bool,
});

export const typeListProp = oneOf([testType.Single, testType.Multi]);

export const listQuestionProps = shape({
    id: number.isRequired,
    q: string.isRequired,
    d: string,
    a: arrayOf(answerProp).isRequired,
});

export const listQuestionsProps = arrayOf(listQuestionProps);

export const listProps = shape({
    name: string.isRequired,
    key: string.isRequired,
    type: typeListProp.isRequired,
    protected: oneOf([true, false]).isRequired,
    questions: listQuestionsProps.isRequired,
});

export const testQuestionProps = shape({
    id: number.isRequired,
    q: string.isRequired,
    d: string,
    a: arrayOf(answerProp).isRequired,
    f: bool,
});

export const testQuestionsProps = arrayOf(testQuestionProps);

export const testProps = shape({
    name: string.isRequired,
    key: string.isRequired,
    type: typeListProp.isRequired,
    protected: oneOf([true, false]).isRequired,
    questions: testQuestionsProps.isRequired,
    index: number.isRequired,
});

export const optionOrderProps = oneOf([runTypes.RANDOM, runTypes.ORDERED]);

export const optionsProps = shape({
    questions: optionOrderProps.isRequired,
    answers: optionOrderProps.isRequired,
    animationTime: number.isRequired,
    animation: bool.isRequired,
});

export const childrenProps = oneOfType([arrayOf(node), node]);

export const addedListItemProps = shape({
    id: number.isRequired,
    key: string.isRequired,
    name: string.isRequired,
});

export const addedListProps = arrayOf(addedListItemProps);

export const selectProps = shape({
    id: oneOfType([number, string]).isRequired,
    label: string.isRequired,
    value: string.isRequired,
});
