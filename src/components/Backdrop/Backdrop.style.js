import styled, { keyframes, css } from 'styled-components';
import { colors } from 'utils/colors';

const animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const Container = styled.div`
    top: 0;
    left: 0;

    ${({ isOpen }) =>
        isOpen &&
        css`
            position: fixed;
            width: 100%;
            height: 100vh;
        `}
`;

export const BackdropStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.Backdrop};
    ${({ animationTime, isVisible }) => css`
        animation: ${animation} ${animationTime}ms ease-in-out;
        transition: opacity ease-in-out ${animationTime}ms;
        opacity: ${isVisible ? 1 : 0};
    `}
`;
