import styled, { css } from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 100%;
    padding: 25px;
    border-radius: 100%;
    border: 2px solid ${colors.Red};
    background-color: ${colors.Dark};
    transform: translateY(-50%) ${({ isVisible }) => (isVisible ? 'translateX(calc(-100% - 20px))' : 'translateX(0)')};
    transition: transform ease-in-out 300ms, border ease-in-out 200ms, background-color ease-in-out 200ms;

    ${({ isActive }) =>
        isActive &&
        css`
            border: 2px solid ${colors.Dark};
            background-color: ${colors.Red};
        `}

    @media screen and (max-width: 1000px) {
        top: 50px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${({ isActive }) => (isActive ? colors.White80 : colors.Red)};
    transition: color ease-in-out 200ms;
`;
