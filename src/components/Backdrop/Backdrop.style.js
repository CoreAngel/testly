import styled, { keyframes } from 'styled-components';
import { colors } from 'utils/colors';

const animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const Container = styled.div`
    position: ${({ isOpen }) => (isOpen ? 'fixed' : 'static')};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const BackdropStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.Backdrop};
    animation: ${animation} ${({ animationTime }) => animationTime}ms ease-in-out;
    transition: opacity ease-in-out ${({ animationTime }) => animationTime}ms;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;
