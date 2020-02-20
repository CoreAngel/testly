import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withCheckAnswer from 'hoc/withCheckAnswer';
import { answerProp } from 'utils/propTypes';
import { getIndexFromKeyCode } from 'utils/keyCodes';
import Buttons from 'components/Answers/Buttons';
import useHistoryPush from 'hooks/useHistoryPush';
import { routes } from 'static/routes';

const Answers = ({
    checkAnswer,
    isGoNext,
    animationTime,
    answers,
    index,
    position,
    nextQuestion,
    isEndList,
    isEndTest,
    setEndAction,
}) => {
    const pushToResult = useHistoryPush(routes.Result);

    useEffect(() => {
        const onKeyDown = e => {
            const isLastQuestion = index === position;
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
    }, [checkAnswer, answers.length, position, index]);

    useEffect(() => {
        if (!isGoNext) return () => {};

        const timeout = setTimeout(() => nextQuestion(), animationTime + 100);
        return () => clearTimeout(timeout);
    }, [nextQuestion, animationTime, isGoNext]);

    useEffect(() => {
        if (isEndList && isGoNext && !isEndTest) {
            const timeout = setTimeout(() => {
                setEndAction();
                pushToResult();
            }, animationTime + 100);

            return () => clearTimeout(timeout);
        }

        return () => {};
    }, [isGoNext, isEndList, isEndTest, pushToResult, setEndAction, animationTime]);

    const isActive = !isEndTest && (isGoNext || index === position);
    return <Buttons answers={answers} active={isActive} animationTime={animationTime} checkAnswer={checkAnswer} />;
};

Answers.propTypes = {
    checkAnswer: PropTypes.func.isRequired,
    isGoNext: PropTypes.bool.isRequired,
    animationTime: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(answerProp).isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    nextQuestion: PropTypes.func.isRequired,
    isEndList: PropTypes.bool.isRequired,
    isEndTest: PropTypes.bool.isRequired,
    setEndAction: PropTypes.func.isRequired,
};

export default withCheckAnswer(Answers);
