import styled, { css } from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => (direction === 'vertical' ? 'column' : 'row')};
`;

export const Input = styled.input`
    width: 0;
    height: 0;
`;

export const Label = styled.label`
    display: flex;
    ${({ isVisible }) =>
        !isVisible &&
        css`
            margin: 0 5px 0 0;
        `}
`;

export const LabelText = styled.p`
    ${({ isVisible }) =>
        isVisible
            ? css`
                  margin: 0 0 5px 10px;
                  font-size: 1.4rem;
              `
            : css`
                  position: absolute;
                  overflow: hidden;
                  clip: rect(0 0 0 0);
                  height: 1px;
                  width: 1px;
                  margin: -1px;
                  padding: 0;
                  border: 0;
              `}
`;

export const Radio = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 100%;
    position: relative;

    ${({ isChecked, color }) =>
        css`
            border: 2px solid ${isChecked ? color : colors.White50};
        `}

    &::before {
        content: '';
        position: absolute;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        border-radius: 100%;
        transition: transform ease-in-out 200ms;

        ${({ isChecked, color }) =>
            css`
                background-color: ${isChecked ? color : colors.White50};
                transform: translate(-2px, -2px) ${isChecked ? 'scale(1)' : 'scale(0)'};
            `}
    }
`;
