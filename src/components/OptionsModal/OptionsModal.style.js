import styled, { keyframes } from 'styled-components';
import { colors } from 'utils/colors';

export const StaticWrapper = styled.div`
    position: fixed;
    z-index: 9999;
`;

const animation = keyframes`
    0% {transform: translateY(100%)}
    100% {transform: translateY(0)}
`;

export const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    animation: ${animation} ${({ animationTime }) => animationTime}ms ease-in-out;
    transition: transform ease-in-out ${({ animationTime }) => animationTime}ms;
    transform: translateY(${({ isOpen }) => (isOpen ? 0 : 100)}%);
`;

export const ModalWrapper = styled.section`
    background-color: ${colors.Dark};
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 10px;
`;

export const ExitButton = styled.button`
    background-color: transparent;
    color: ${colors.White80};
    border: 0;
    margin: 0;
    padding: 6px;
    position: absolute;
    top: 20px;
    right: 20px;
`;
