import styled from 'styled-components';
import { colors } from 'utils/colors';

export const ErrorWrapper = styled.div`
    padding: 5px;
    ${({ error, warning }) => {
        if (error) return `border: 1px solid ${colors.Red}`;
        if (warning) return `border: 1px solid ${colors.Yellow}`;
        return '';
    }}
`;

export const ErrorInfo = styled.div`
    font-size: 1.2rem;
    ${({ error, warning }) => {
        if (error) return `color: ${colors.Red}`;
        if (warning) return `color: ${colors.Yellow}`;
        return '';
    }}
`;
