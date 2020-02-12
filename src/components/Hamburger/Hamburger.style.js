import styled, { css } from 'styled-components';
import { colors } from 'utils/colors';

export const Button = styled.button`
    padding: 5px;
    margin: 0;
    background-color: transparent;
    border: none;
    height: 30px;
    width: 35px;
    position: relative;

    &:focus {
        outline: none;
    }

    &:focus::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: solid 1px orange;
        border-radius: 2px;
    }
`;

export const NavIconWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    &::after {
        top: 50%;
        content: '';
        position: absolute;
        left: 0;
        height: 3px;
        width: 100%;
        border-radius: 1px;
        background-color: ${colors.White};
        transition: 200ms;
        transform: translateY(-50%);
        transition-delay: 200ms;

        ${({ isOpen }) =>
            isOpen &&
            css`
                transform: translateY(-50%) translateX(-100%);
                opacity: 0;
                transition-delay: 0ms;
            `}
    }
`;

export const NavIcon = styled.div`
    &::after,
    &::before {
        position: absolute;
        content: '';
        left: 0;
        height: 3px;
        width: 100%;
        border-radius: 1px;
        background-color: ${colors.White};
        transition: 200ms;
    }

    &::before {
        top: 0;

        ${({ isOpen }) =>
            isOpen &&
            css`
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
                transition-delay: 200ms;
            `}
    }

    &::after {
        bottom: 0;

        ${({ isOpen }) =>
            isOpen &&
            css`
                bottom: 50%;
                transform: translateY(50%) rotate(-45deg);
                transition-delay: 200ms;
            `}
    }
`;
