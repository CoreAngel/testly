import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;

export const OptionButton = styled.button`
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: ${colors.White};
`;
