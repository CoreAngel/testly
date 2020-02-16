import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import { ButtonContainer, ButtonWithMargin } from './ButtonAnswers.style';

const ButtonAnswers = ({ numberOfQuestions, onClick }) => {
    return (
        <ButtonContainer>
            {[...Array(numberOfQuestions)].map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ButtonWithMargin data-index={index} key={index} color="primary" onClick={onClick}>
                    {String.fromCharCode(keyCodes.A + index)}
                </ButtonWithMargin>
            ))}
        </ButtonContainer>
    );
};

ButtonAnswers.propTypes = {
    numberOfQuestions: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonAnswers;
