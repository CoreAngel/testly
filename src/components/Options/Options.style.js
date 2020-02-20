import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    padding: 25px 20px;
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

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const Header = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 0;
`;

export const OptionRow = styled.div`
    padding: 2px 0;
    margin-bottom: 6px;
`;

export const TogglerText = styled.p`
    margin: 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
`;
