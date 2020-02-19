import React from 'react';
import PropTypes from 'prop-types';
import { answerType } from 'static/list';
import { answerProp } from 'utils/propTypes';
import { getCharFromIndex } from 'utils/keyCodes';
import { Answer, AnswersList, QuestionContainer, QuestionText } from './Question.style';

const Question = ({ number, question, answers, includeSelected }) => {
    return (
        <QuestionContainer>
            <QuestionText>{`${number}. ${question}`}</QuestionText>
            <AnswersList>
                {answers.map(({ i, c, s }, index) => {
                    const isCorrect = c === answerType.Correct;
                    const isNotSure = c === answerType.NotSure;
                    const isSelected = s === true;
                    const itemIndicator = getCharFromIndex(index);

                    return (
                        <Answer
                            key={
                                // eslint-disable-next-line react/no-array-index-key
                                index
                            }
                            isCorrect={isCorrect}
                            isNotSure={isNotSure}
                            isSelected={isSelected}
                            includeSelected={includeSelected}
                        >
                            {`${itemIndicator}) ${i}`}
                        </Answer>
                    );
                })}
            </AnswersList>
        </QuestionContainer>
    );
};

Question.propTypes = {
    includeSelected: PropTypes.bool,
    number: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(answerProp).isRequired,
};

Question.defaultProps = {
    includeSelected: false,
};

export default Question;
