import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion, addFail } from 'redux/testReducer';
import keyCodes from 'utils/keyCodes';
import TestViewUi from './TestViewUi';

const TestViewService = ({ questions, currentIndex, nextQuestionAction, addFailAction }) => {
    const { q, a, c } = questions[currentIndex];

    const checkAnswer = index => {
        if (c === index) {
            if (currentIndex + 1 < questions.length) {
                nextQuestionAction();
            }
        } else {
            addFailAction(currentIndex);
        }
    };

    const onKeyPress = keyCode => {
        let index;

        if (keyCode >= keyCodes.N1 && keyCode <= keyCodes.N9) {
            index = keyCode - keyCodes.N1;
        } else if (keyCode >= keyCodes.a && keyCode <= keyCodes.z) {
            index = keyCode - keyCodes.a;
        } else if (keyCode >= keyCodes.A && keyCode <= keyCodes.Z) {
            index = keyCode - keyCodes.A;
        } else {
            return;
        }

        if (index >= a.length) {
            return;
        }

        checkAnswer(index);
    };

    return (
        <TestViewUi
            answers={a}
            question={q}
            checkAnswer={checkAnswer}
            keyPress={onKeyPress}
            questionCounter={currentIndex + 1}
            questionsNumber={questions.length}
        />
    );
};

TestViewService.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
            fails: PropTypes.number.isRequired,
        }),
    ).isRequired,
    currentIndex: PropTypes.number.isRequired,
    nextQuestionAction: PropTypes.func.isRequired,
    addFailAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ test: { questions, currentIndex } }) => ({
    questions,
    currentIndex,
});

const mapDispatchToProps = {
    nextQuestionAction: nextQuestion,
    addFailAction: addFail,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestViewService);
