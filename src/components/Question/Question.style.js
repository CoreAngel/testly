import styled from 'styled-components';
import { colors } from 'utils/colors';

export const QuestionContainer = styled.div`
    padding: 10px;
`;

export const QuestionText = styled.p`
    font-weight: bold;
`;

export const AnswersList = styled.ul`
    list-style-type: lower-alpha;
`;

export const Answer = styled.li`
    ${({ correct }) => correct && `background-color: ${colors.Green}`};
`;
