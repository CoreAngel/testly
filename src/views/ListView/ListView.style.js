import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    margin-bottom: 70px;
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

export const Error = styled.p`
    margin-top: 20px;
    color: ${colors.White80};
    background-color: ${colors.Red};
    padding: 5px 10px;
    font-size: 1.4rem;
`;
