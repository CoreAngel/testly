import styled from 'styled-components';
import { colors } from 'utils/colors';

export const FailedText = styled.p`
    margin: 0;
`;

export const NoItemsText = styled.p`
    font-size: 2.3rem;
    text-align: center;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
`;

export const Container = styled.div`
    margin: 15px 0 70px 0;
`;

export const RunContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    margin: 15px 0 0 0;
`;

export const RunOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RunOption = styled.span`
    margin: 0;
    font-size: 1.2rem;
`;

export const RunButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const RunButtonText = styled.p`
    margin: 0 10px 0 0;
`;

export const RunButton = styled.button`
    color: ${colors.White80};
    background-color: transparent;
    border: 0;
    padding: 0;
`;

export const ConfirmText = styled.p`
    margin: 0 0 10px 0;
    padding: 0 10px;
    text-align: center;
`;
