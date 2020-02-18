import React from 'react';
import PropTypes from 'prop-types';
import { answerProp } from 'utils/propTypes';
import { answerType } from 'static/list';
import keyCodes from 'utils/keyCodes';
import { Answer, AnswersList, ButtonsContainer, StyledButton } from './Buttons.style';

const Buttons = ({ answers, active, animationTime, checkAnswer }) => {
    return (
        <>
            <AnswersList>
                {answers.map(({ i, c, s }, ind) => {
                    const isCorrect = c === answerType.Correct;
                    const isNotSure = c === answerType.NotSure;
                    const isSelected = s === true;

                    return (
                        <Answer
                            key={
                                // eslint-disable-next-line react/no-array-index-key
                                ind
                            }
                            isCorrect={isCorrect}
                            isNotSure={isNotSure}
                            isSelected={isSelected}
                            isActive={active}
                            animationTime={animationTime}
                        >
                            {i}
                        </Answer>
                    );
                })}
            </AnswersList>
            <ButtonsContainer>
                {[...new Array(answers.length)].map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <StyledButton key={index} color="primary" onClick={() => checkAnswer(index)}>
                        {String.fromCharCode(index + keyCodes.A)}
                    </StyledButton>
                ))}
            </ButtonsContainer>
        </>
    );
};

Buttons.propTypes = {
    answers: PropTypes.arrayOf(answerProp).isRequired,
    active: PropTypes.bool.isRequired,
    animationTime: PropTypes.number.isRequired,
    checkAnswer: PropTypes.func.isRequired,
};

export default Buttons;
