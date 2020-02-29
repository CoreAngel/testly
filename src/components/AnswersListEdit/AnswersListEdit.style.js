import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';

export const AnswersContainer = styled.div`
    padding: 10px 5px;
    font-size: 1.3rem;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        padding: 5px;
    }
`;
