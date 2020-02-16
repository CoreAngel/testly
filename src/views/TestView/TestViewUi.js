import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { answerProp } from 'utils/propTypes';
import Question from 'components/Question/Question';
import ButtonAnswers from 'components/ButtonAnswers/ButtonAnswers';

const TestViewUi = ({ questionCounter, questionsNumber, question, answers, checkAnswer, keyPress }) => {
    const onClick = useCallback(
        event => {
            const button = event.target;
            const index = button.getAttribute('data-index');
            button.blur();
            checkAnswer(+index);
        },
        [checkAnswer],
    );

    const onKeyPress = useCallback(
        event => {
            const { keyCode } = event;
            keyPress(keyCode);
        },
        [keyPress],
    );

    useEffect(() => {
        window.addEventListener('keypress', onKeyPress);
        return () => window.removeEventListener('keypress', onKeyPress);
    }, [onKeyPress]);

    return (
        <div>
            <p>
                {questionCounter}/{questionsNumber}
            </p>
            <Question showCorrect={false} number={questionCounter} answers={answers} question={question} />
            <ButtonAnswers numberOfQuestions={answers.length} onClick={onClick} />
        </div>
    );
};

TestViewUi.propTypes = {
    questionCounter: PropTypes.number.isRequired,
    questionsNumber: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(answerProp).isRequired,
    checkAnswer: PropTypes.func.isRequired,
    keyPress: PropTypes.func.isRequired,
};

export default TestViewUi;
