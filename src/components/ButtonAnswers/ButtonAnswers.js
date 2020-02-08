import React from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import { ButtonContainer, ButtonWithMargin } from './ButtonAnswers.style';

const ButtonAnswers = ({ answers, onClick }) => {
    return (
        <ButtonContainer>
            {answers.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ButtonWithMargin data-index={index} key={index} color="primary" onClick={onClick}>
                    {String.fromCharCode(keyCodes.A + index)}
                </ButtonWithMargin>
            ))}
        </ButtonContainer>
    );
};

ButtonAnswers.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonAnswers;
