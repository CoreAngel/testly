import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

export const Header = styled.div`
    display: flex;
    align-items: start;
    background-color: ${colors.Dark};
    color: ${colors.White80};
    border: 0;
    width: 100%;
    padding: 8px 10px;
    text-align: left;
`;

export const HeaderIndicator = styled.p`
    margin: 0 5px 0 0;
`;

export const HeaderText = styled.p`
    margin: 0;
    display: flex;
    flex: 1;
    word-break: break-word;
`;

export const HeaderIcon = styled.span`
    margin-left: auto;
    transform: ${({ isOpen }) => (isOpen ? `rotate(180deg)` : `rotate(0)`)};
    transition: transform ease-in-out 200ms;
`;

export const Body = styled.div`
    background-color: ${colors.Primary};
    padding: 10px;
`;

export const Row = styled.div`
    margin-bottom: 15px;
`;
