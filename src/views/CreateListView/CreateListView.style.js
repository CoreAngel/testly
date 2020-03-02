import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    padding: 0 10px;
    margin: 0 0 20px 0;
`;

export const BackButtonWrapper = styled.div`
    margin-bottom: 20px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 2rem;
`;

export const HeaderText = styled.span`
    margin-left: 10px;
`;

export const Buttons = styled.div``;

export const ButtonReset = styled.button`
    background-color: ${colors.Red50};
    color: ${colors.White80};
    font-weight: bold;
    font-size: 1.3rem;
    border: 0;
    padding: 5px 20px;
    margin: 0 10px 0 0;
`;

export const ButtonSave = styled(ButtonReset)`
    background-color: ${colors.Green50};
    margin: 0;
`;
