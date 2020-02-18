import styled, { css, keyframes } from 'styled-components';
import { colors } from 'utils/colors';
import { Button } from 'reactstrap';

export const AnswersList = styled.ul`
    list-style-type: none;
    width: 100%;
`;

const fadeIsCorrect = keyframes`
    0% {background-color: ${colors.Green0};}
    100% {background-color: ${colors.Green};}
`;

const fadeIsNotSure = keyframes`
    0% {background-color: ${colors.Yellow0};}
    100% {background-color: ${colors.Yellow};}
`;

const fadeIsIncorrect = keyframes`
    0% {background-color: ${colors.Red0};}
    100% {background-color: ${colors.Red};}
`;

export const Answer = styled.li`
    ${({ isCorrect, isNotSure, isSelected, isActive, animationTime }) => {
        if (!isSelected) return css``;

        if (isCorrect)
            return css`
                animation: ${fadeIsCorrect} ease-in-out ${isActive ? animationTime : 0}ms forwards;
            `;
        if (isNotSure)
            return css`
                animation: ${fadeIsNotSure} ease-in-out ${isActive ? animationTime : 0}ms forwards;
            `;

        return css`
            animation: ${fadeIsIncorrect} ease-in-out ${isActive ? animationTime : 0}ms forwards;
        `;
    }}
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledButton = styled(Button)`
    margin: 5px;
`;
