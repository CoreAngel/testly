import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${colors.Primary};
    color: ${colors.White80};
    min-height: 100vh;
    position: relative;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
`;
