import styled, { css, keyframes } from 'styled-components';
import { colors } from 'utils/colors';

export const Wrapper = styled.div`
    padding: 0 10px;
`;

export const AnswersList = styled.ul`
    list-style-type: none;
    width: 100%;
    padding: 0;
`;

const fadeIn = keyframes`
    0% {background-position: 100% 50%}
    100% {background-position: 0 50%}
`;

export const Answer = styled.li`
    margin: 5px 0;
    padding: 0 5px;

    ${({ isCorrect, isNotSure, isSelected, isActive, animationTime }) => {
        if (!isSelected) return css``;

        if (isCorrect)
            return css`
                background: linear-gradient(
                        90deg,
                        ${isActive ? colors.Green : colors.Green50},
                        ${colors.Green0},
                        ${colors.Green0}
                    )
                    right center/200% 100% no-repeat;
                animation: ${fadeIn} ease-in-out ${isActive ? animationTime : 0}ms forwards;
            `;
        if (isNotSure)
            return css`
                background: linear-gradient(
                        90deg,
                        ${isActive ? colors.Yellow : colors.Yellow50},
                        ${colors.Yellow0},
                        ${colors.Yellow0}
                    )
                    right center/200% 100% no-repeat;
                animation: ${fadeIn} ease-in-out ${isActive ? animationTime : 0}ms forwards;
            `;

        return css`
            background: linear-gradient(90deg, ${isActive ? colors.Red : colors.Red50}, ${colors.Red0}, ${colors.Red0})
                right center/200% 100% no-repeat;
            animation: ${fadeIn} ease-in-out ${isActive ? animationTime : 0}ms forwards;
        `;
    }}
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const animationButton = (isActive, activeColor, inactiveColor) => keyframes`
    0% {background-color: ${isActive ? colors.White80 : colors.White50};}
    100% {background-color: ${isActive ? activeColor : inactiveColor};}
`;

export const Button = styled.button`
    border: 0;
    padding: 5px 10px;
    margin: 5px;
    font-weight: bold;

    ${({ isSelected, isActive }) => css`
        background-color: ${isActive ? colors.White80 : colors.White50};
        color: ${isSelected ? colors.White80 : colors.Primary};

        &:hover,
        &:focus {
            ${isActive && `background-color: ${colors.White}`};
        }
    `}

    ${({ isCorrect, isNotSure, isSelected, isActive, animationTime }) => {
        if (!isSelected) return css``;

        if (isCorrect)
            return css`
                animation: ${animationButton(isActive, colors.Green, colors.Green50)} ease-in-out
                    ${isActive ? animationTime : 0}ms forwards;
            `;
        if (isNotSure)
            return css`
                animation: ${animationButton(isActive, colors.Yellow, colors.Yellow50)} ease-in-out
                    ${isActive ? animationTime : 0}ms forwards;
            `;

        return css`
            animation: ${animationButton(isActive, colors.Red, colors.Red50)} ease-in-out
                ${isActive ? animationTime : 0}ms forwards;
        `;
    }}
`;
