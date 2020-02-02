import React from "react";
import keyCodes from "../util/keyCodes";
import styled from "styled-components";
import {Button} from "reactstrap";

const ButtonAnswers = ({answers, onClick}) => {
    return <ButtonContainer>
        {
            answers.map((item, index) => (
                <ButtonWithMargin data-index={index} key={index} color='primary' onClick={onClick}>
                    {String.fromCharCode(keyCodes.A + index)}
                </ButtonWithMargin>)
            )
        }
    </ButtonContainer>;
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
