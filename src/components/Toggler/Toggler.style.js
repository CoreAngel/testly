import styled, { css } from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.label`
    display: flex;
    margin: 0;
`;

export const Checkbox = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    opacity: 0;
`;

export const IconWrapper = styled.div`
    position: relative;
    padding: 2px;
    box-shadow: inset 0 0 4px ${colors.Dark};
    margin: 0 10px 0 0;
    transition: background-color ease-in-out 200ms, border ease-in-out 200ms;

    ${({ checked, size }) => css`
        width: ${2 * size}px;
        height: ${size}px;
        border-radius: ${size}px;
        background-color: ${checked ? colors.Green50 : colors.Red50};
        border: solid 1px ${checked ? colors.Green50 : colors.Red50};
    `}
`;

export const Icon = styled.div`
    border-radius: 100%;
    transition: background-color ease-in-out 200ms, transform ease-in-out 200ms;

    ${({ checked, size }) => css`
        width: ${size - 6}px;
        height: ${size - 6}px;
        background-color: ${checked ? colors.Green : colors.Red};
        transform: translateX(${checked ? '0' : `${size}px`});
    `}
`;
