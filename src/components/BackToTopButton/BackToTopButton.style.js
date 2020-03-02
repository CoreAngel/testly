import styled, { css } from 'styled-components';
import { colors } from 'utils/colors';

export const Button = styled.button`
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: ${colors.Dark};
    color: ${colors.White80};
    padding: 30px;
    border: 0;
    border-radius: 100%;
    z-index: 500;
    transition: transform ease-in-out 200ms, opacity ease-in-out 200ms;
    transform: scale(0);
    opacity: 0;

    ${({ active }) =>
        active &&
        css`
            transform: scale(1);
            opacity: 1;
        `};

    @media screen and (max-width: 900px) {
        bottom: 20px;
        right: 20px;
        padding: 25px;
    }
`;

export const InnerWrapper = styled.div`
    position: relative;
`;

export const IconWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
`;
