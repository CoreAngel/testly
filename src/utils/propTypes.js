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
    protected: oneOf([true, false]),
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

export const editStringWithValidation = shape({
    item: string.isRequired,
    errors: arrayOf(string).isRequired,
    warnings: arrayOf(string).isRequired,
});

export const editAnswerProp = shape({
    lId: number.isRequired,
    i: string.isRequired,
    c: oneOf([answerType.Correct, answerType.NotSure, answerType.Incorrect]),
    errors: arrayOf(string).isRequired,
    warnings: arrayOf(string).isRequired,
});

export const editAnswersObjProps = shape({
    answers: arrayOf(editAnswerProp).isRequired,
    errors: arrayOf(string).isRequired,
    warnings: arrayOf(string).isRequired,
});

export const editQuestionProps = shape({
    lId: number.isRequired,
    q: editStringWithValidation.isRequired,
    d: editStringWithValidation,
    a: editAnswersObjProps.isRequired,
    error: bool.isRequired,
    warning: bool.isRequired,
    idIterator: number.isRequired,
});

export const editQuestionsProps = arrayOf(editQuestionProps);

export const editProps = shape({
    name: editStringWithValidation.isRequired,
    password: editStringWithValidation.isRequired,
    type: shape({
        item: typeListProp.isRequired,
        errors: arrayOf(string).isRequired,
    }).isRequired,
    questions: editQuestionsProps.isRequired,
    idIterator: number.isRequired,
    isLoading: bool.isRequired,
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

export const radioSelectItemsProps = arrayOf(
    shape({
        value: string.isRequired,
        label: string.isRequired,
        color: string,
    }),
);
