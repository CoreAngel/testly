import React from 'react';
import PropTypes from 'prop-types';
import { answerProp } from 'utils/propTypes';
import { answerType } from 'static/list';
import keyCodes, { getCharFromIndex } from 'utils/keyCodes';
import { MainContainer } from 'utils/style';
import { Wrapper, Answer, AnswersList, ButtonsContainer, Button } from './Buttons.style';

const Buttons = ({ answers, active, animationTime, checkAnswer }) => {
    return (
        <MainContainer>
            <Wrapper>
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
                                isActive={active}
                                animationTime={animationTime}
                            >
                                {`${itemIndicator}) ${i}`}
                            </Answer>
                        );
                    })}
                </AnswersList>
                <ButtonsContainer>
                    {answers.map(({ c, s }, index) => {
                        const isCorrect = c === answerType.Correct;
                        const isNotSure = c === answerType.NotSure;
                        const isSelected = s === true;
                        const isDisabled = isSelected || !active;

                        return (
                            <Button
                                key={
                                    // eslint-disable-next-line react/no-array-index-key
                                    index
                                }
                                disabled={isDisabled}
                                onClick={() => checkAnswer(index)}
                                isCorrect={isCorrect}
                                isNotSure={isNotSure}
                                isSelected={isSelected}
                                isActive={active}
                                animationTime={animationTime}
                            >
                                {String.fromCharCode(index + keyCodes.A)}
                            </Button>
                        );
                    })}
                </ButtonsContainer>
            </Wrapper>
        </MainContainer>
    );
};

Buttons.propTypes = {
    answers: PropTypes.arrayOf(answerProp).isRequired,
    active: PropTypes.bool.isRequired,
    animationTime: PropTypes.number.isRequired,
    checkAnswer: PropTypes.func.isRequired,
};

export default Buttons;
