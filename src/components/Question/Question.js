import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { answerType } from 'static/list';
import { answerProp } from 'utils/propTypes';
import { getCharFromIndex } from 'utils/keyCodes';
import { linkRegEx } from 'utils/regex';
import { connect } from 'react-redux';
import { Answer, AnswersList, QuestionContainer, QuestionText, Description } from './Question.style';

const Question = ({ number, question, description, answers, includeSelected, showDesc }) => {
    const isShowDesc = description !== null && showDesc;

    const changeLinkToATag = useCallback(text => {
        return text.split(linkRegEx).map((part, index) =>
            index % 2 === 0 ? (
                part
            ) : (
                // eslint-disable-next-line react/no-array-index-key
                <a key={index} href={part} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            ),
        );
    }, []);

    return (
        <QuestionContainer>
            <QuestionText>{`${number}. ${question}`}</QuestionText>
            {isShowDesc && <Description>{changeLinkToATag(description)}</Description>}
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
    description: PropTypes.string,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(answerProp).isRequired,
    showDesc: PropTypes.bool.isRequired,
};

Question.defaultProps = {
    includeSelected: false,
    description: null,
};

const mapStateToProps = ({ options: { description } }) => ({ showDesc: description });

export default connect(mapStateToProps)(Question);
