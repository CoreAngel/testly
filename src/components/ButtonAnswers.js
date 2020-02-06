import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import keyCodes from '../util/keyCodes';

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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
`;

const ButtonWithMargin = styled(Button)`
    margin: 0 10px;
`;

export default ButtonAnswers;
