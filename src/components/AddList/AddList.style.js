import styled from 'styled-components';
import { colors } from 'utils/colors';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    width: 100%;
    max-width: 210px;
    margin-bottom: 30px;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        max-width: unset;
    }
`;

export const Header = styled.h2`
    margin: 0 0 30px 0px;
    font-weight: bold;
    font-size: 2rem;
`;

export const Button = styled.button`
    background-color: ${({ disabled }) => (disabled ? colors.White50 : colors.White80)};
    color: ${colors.Dark};
    border: 0;
    width: 100%;
    padding: 5px 10px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 15px;
`;

export const Error = styled.p`
    margin-top: 10px;
    color: ${colors.White80};
    background-color: ${colors.Red};
    padding: 5px 10px;
    font-size: 1.4rem;
`;
