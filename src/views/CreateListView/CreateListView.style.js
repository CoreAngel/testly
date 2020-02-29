import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.div`
    padding: 0 10px;
`;

export const Header = styled.h2`
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: 0 0 30px 0;
    font-size: 2rem;
`;

export const HeaderText = styled.span`
    margin-left: 10px;
`;

export const Row = styled.div`
    margin-bottom: 25px;
`;

export const Wrapper = styled.div`
    margin: 0 auto;
    width: 60%;

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

export const AddButton = styled.button`
    display: flex;
    background-color: transparent;
    border: 0;
    padding: 5px;
    margin-left: auto;
    color: ${colors.White80};
`;
