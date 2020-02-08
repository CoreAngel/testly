import React from 'react';
import PropTypes from 'prop-types';
import { Answer, AnswersList, QuestionContainer, QuestionText } from './Question.style';

const Question = ({ number, question, answers, correct }) => {
    return (
        <QuestionContainer>
            <QuestionText>{`${number}. ${question}`}</QuestionText>
            <AnswersList>
                {answers.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Answer correct={index === correct} key={index}>
                        {item}
                    </Answer>
                ))}
            </AnswersList>
        </QuestionContainer>
    );
};

Question.propTypes = {
    number: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct: PropTypes.number,
};

Question.defaultProps = {
    correct: null,
};

export default Question;
