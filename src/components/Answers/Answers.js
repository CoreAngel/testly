import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withCheckAnswer from 'hoc/withCheckAnswer';
import { answerProp } from 'utils/propTypes';
import { getIndexFromKeyCode } from 'utils/keyCodes';
import Buttons from 'components/Answers/Buttons';
import useHistoryPush from 'hooks/useHistoryPush';
import { routes } from 'static/routes';
import { nextQuestion, setEnd } from 'redux/testReducer';
import { connect } from 'react-redux';

const Answers = ({
    checkAnswer,
    isGoNext,
    animationTime,
    answers,
    index,
    position,
    nextQuestionAction,
    isQuestionsEnd,
    isTestEnd,
    setEndAction,
}) => {
    const pushToResult = useHistoryPush(routes.Result);
    const isLastQuestion = index === position;

    useEffect(() => {
        const onKeyDown = e => {
            if (!isLastQuestion) return;

            const { keyCode } = e;
            const ind = getIndexFromKeyCode(keyCode);

            const isCorrectKeyCode = ind !== null;
            const isIndexInRange = ind < answers.length;
            if (!isCorrectKeyCode || !isIndexInRange) return;

            checkAnswer(ind);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [checkAnswer, answers.length, isLastQuestion]);

    useEffect(() => {
        if (!isGoNext) return () => {};

        const timeout = setTimeout(() => nextQuestionAction(), animationTime + 100);
        return () => clearTimeout(timeout);
    }, [nextQuestionAction, animationTime, isGoNext]);

    useEffect(() => {
        const isTestOver = isQuestionsEnd && isGoNext;
        if (isTestOver && !isTestEnd) {
            const timeout = setTimeout(() => {
                setEndAction();
                pushToResult();
            }, animationTime + 100);

            return () => clearTimeout(timeout);
        }

        return () => {};
    }, [isGoNext, isQuestionsEnd, isTestEnd, pushToResult, setEndAction, animationTime]);

    const isActive = !isTestEnd && (isGoNext || isLastQuestion);
    return <Buttons answers={answers} active={isActive} animationTime={animationTime} checkAnswer={checkAnswer} />;
};

Answers.propTypes = {
    position: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(answerProp).isRequired,
    isGoNext: PropTypes.bool.isRequired,
    isQuestionsEnd: PropTypes.bool.isRequired,
    isTestEnd: PropTypes.bool.isRequired,
    animationTime: PropTypes.number.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    nextQuestionAction: PropTypes.func.isRequired,
    setEndAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ test: { index, end } }) => ({
    index,
    isTestEnd: end,
});

const mapDispatchToProps = {
    nextQuestionAction: nextQuestion,
    setEndAction: setEnd,
};

const AnswersWithStore = connect(mapStateToProps, mapDispatchToProps)(Answers);

export default withCheckAnswer(AnswersWithStore);
