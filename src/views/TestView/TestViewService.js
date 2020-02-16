import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion, setFail } from 'redux/testReducer';
import keyCodes from 'utils/keyCodes';
import { testProps } from 'utils/propTypes';
import { answerType } from 'static/list';
import TestViewUi from './TestViewUi';

const TestViewService = ({ test, index, nextQuestionAction, setFailAction }) => {
    const { q, a } = test.list[index];

    const checkAnswer = ind => {
        const isInAnswersRange = ind < a.length;
        const isInQuestionsRange = index < test.list.length;
        if (!isInAnswersRange || !isInQuestionsRange) return;

        const isCorrect = a[ind].c === answerType.Correct;
        const isNonSure = a[ind].c === answerType.NotSure;
        if (isCorrect || isNonSure) {
            nextQuestionAction();
        } else {
            setFailAction(ind);
        }
    };

    const onKeyPress = keyCode => {
        let ind;

        if (keyCode >= keyCodes.N1 && keyCode <= keyCodes.N9) {
            ind = keyCode - keyCodes.N1;
        } else if (keyCode >= keyCodes.a && keyCode <= keyCodes.z) {
            ind = keyCode - keyCodes.a;
        } else if (keyCode >= keyCodes.A && keyCode <= keyCodes.Z) {
            ind = keyCode - keyCodes.A;
        } else {
            return;
        }

        if (ind >= a.length) {
            return;
        }

        checkAnswer(ind);
    };

    return (
        <TestViewUi
            answers={a}
            question={q}
            checkAnswer={checkAnswer}
            keyPress={onKeyPress}
            questionCounter={index + 1}
            questionsNumber={test.list.length}
        />
    );
};

TestViewService.propTypes = {
    test: testProps.isRequired,
    index: PropTypes.number.isRequired,
    nextQuestionAction: PropTypes.func.isRequired,
    setFailAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ test }) => ({
    test,
    index: test.index,
});

const mapDispatchToProps = {
    nextQuestionAction: nextQuestion,
    setFailAction: setFail,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestViewService);
