import PropTypes from 'prop-types';
import { runTypes } from 'static/run';

export const listQuestionListProps = PropTypes.arrayOf(
    PropTypes.shape({
        index: PropTypes.number.isRequired,
        q: PropTypes.string.isRequired,
        a: PropTypes.arrayOf(PropTypes.string).isRequired,
        c: PropTypes.number.isRequired,
    }),
);

export const listProps = PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    list: listQuestionListProps.isRequired,
});

export const testQuestionListProps = PropTypes.arrayOf(
    PropTypes.shape({
        index: PropTypes.number.isRequired,
        q: PropTypes.string.isRequired,
        a: PropTypes.arrayOf(PropTypes.string).isRequired,
        c: PropTypes.number.isRequired,
    }),
);

export const testProps = PropTypes.shape({
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    list: testQuestionListProps.isRequired,
});

export const optionOrderProps = PropTypes.oneOf([runTypes.RANDOM, runTypes.ORDERED]);

export const optionProps = PropTypes.shape({
    questions: optionOrderProps.isRequired,
    answers: optionOrderProps.isRequired,
});
