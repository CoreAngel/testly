import styled, { css } from 'styled-components';
import { colors } from 'utils/colors';

export const QuestionContainer = styled.div`
    padding: 10px;
`;

export const QuestionText = styled.p`
    font-weight: bold;
`;

export const Description = styled.p`
    font-size: 1.3rem;

    & a {
        color: ${colors.White80};

        &:hover {
            color: ${colors.White};
        }
    }
`;

export const AnswersList = styled.ul`
    list-style-type: none;
    padding-left: 15px;
`;

export const Answer = styled.li`
    margin: 5px 0;
    padding: 0 5px;

    ${({ isCorrect, isNotSure, isSelected, includeSelected }) => {
        if (isCorrect)
            return includeSelected && !isSelected
                ? css`
                      background: linear-gradient(90deg, ${colors.Green50}, ${colors.Green0});
                  `
                : css`
                      background: linear-gradient(90deg, ${colors.Green}, ${colors.Green0});
                  `;

        if (isNotSure)
            return includeSelected && !isSelected
                ? css`
                      background: linear-gradient(90deg, ${colors.Yellow50}, ${colors.Yellow0});
                  `
                : css`
                      background: linear-gradient(90deg, ${colors.Yellow}, ${colors.Yellow0});
                  `;

        if (includeSelected && isSelected)
            return css`
                background: linear-gradient(90deg, ${colors.Red}, ${colors.Red0});
            `;

        return css``;
    }}
`;
