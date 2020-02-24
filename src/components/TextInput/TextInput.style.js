import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.div`
    position: relative;
    width: 100%;
`;

export const Input = styled.input`
    font-size: 1.4rem;
    padding: 3px 5px;
    background-color: transparent;
    border: 0;
    color: ${colors.White80};
    position: relative;
    outline: none;
    width: 100%;

    &:focus + label::before {
        transform: translateX(0);
    }
`;

export const Label = styled.label`
    position: absolute;
    height: 2px;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${colors.White50};
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: ${colors.White};
        transform: translateX(-101%);
        transition: transform ease-in-out 150ms;
    }
`;
