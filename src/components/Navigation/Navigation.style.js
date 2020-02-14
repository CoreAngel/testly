import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    margin: 20px 10px;
    display: flex;
    justify-content: space-between;
`;

export const OptionButtonWrapper = styled.div`
    position: relative;
`;

export const OptionButton = styled.button`
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: ${colors.White};
`;
