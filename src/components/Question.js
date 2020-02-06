import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuestionContainer = styled.div`
    padding: 10px;
`;
const QuestionText = styled.p`
    font-weight: bold;
`;
const AnswersList = styled.ul`
    list-style-type: lower-alpha;
`;

const Answer = styled.li`
    background-color: ${({ correct }) => (correct ? 'green' : 'none')};
`;

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
