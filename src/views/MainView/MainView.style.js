import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${colors.Primary};
    color: ${colors.White80};
    min-height: 100vh;
    position: relative;
`;
