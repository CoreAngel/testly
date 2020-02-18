import React from 'react';
import PropTypes from 'prop-types';
import { answerType } from 'static/list';
import { answerProp } from 'utils/propTypes';
import { getCharFromIndex } from 'utils/keyCodes';
import { Answer, AnswersList, QuestionContainer, QuestionText } from './Question.style';

const Question = ({ number, question, answers, showCorrect }) => {
    return (
        <QuestionContainer>
            <QuestionText>{`${number}. ${question}`}</QuestionText>
            <AnswersList>
                {answers.map(({ i, c }, index) => {
                    const isCorrect = showCorrect && c === answerType.Correct;
                    const isNotSure = showCorrect && c === answerType.NotSure;
                    const itemIndicator = getCharFromIndex(index);

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Answer correct={isCorrect} notSure={isNotSure} key={index}>
                            {`${itemIndicator}) ${i}`}
                        </Answer>
                    );
                })}
            </AnswersList>
        </QuestionContainer>
    );
};

Question.propTypes = {
    showCorrect: PropTypes.bool,
    number: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(answerProp).isRequired,
};

Question.defaultProps = {
    showCorrect: true,
};

export default Question;
