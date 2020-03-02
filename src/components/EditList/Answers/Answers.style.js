import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';
import { colors } from 'utils/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: ${colors.Primary};
`;

export const AnswersWrapper = styled.div`
    padding: 10px 5px;
    font-size: 1.3rem;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        padding: 5px;
    }
`;

export const AnswerHeader = styled.p`
    font-size: 1.4rem;
`;

export const AddButton = styled.button`
    display: flex;
    background-color: transparent;
    border: 0;
    padding: 5px;
    margin-left: auto;
    color: ${colors.White80};
`;
