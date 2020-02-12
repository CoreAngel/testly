import styled from 'styled-components';
import { colors } from 'utils/colors';

export const ListTitle = styled.h2`
    margin: 0 0 10px 0;
    font-size: 1.8rem;
    color: ${colors.White};
`;

export const List = styled.ul`
    list-style-type: none;
    margin: 0 0 0 15px;
    padding: 0;
`;

export const ListItem = styled.li`
    color: ${colors.White};
    display: flex;
`;

export const ItemButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${colors.White};
    font-size: 1.4rem;
    margin: 0;
    padding: 5px 5px;
    width: 100%;
    text-align: left;
`;

export const KeySpan = styled.span`
    color: ${colors.White80};
    font-size: 1.2rem;
`;
