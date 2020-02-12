import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'utils/colors';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LinkStyled = styled(Link)`
    color: ${colors.White80};
    text-align: center;
    margin: 0 10px;

    &:hover,
    &:active {
        color: ${colors.White};
        text-decoration: none;
    }
`;

export const RunButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${colors.White80};
    margin: 0 10px;
    padding: 0;
`;

export const LinkText = styled.span`
    font-size: 1.2rem;
`;
