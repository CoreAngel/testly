import styled from 'styled-components';
import { colors } from 'utils/colors';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    padding: 20px;
    border-radius: 5px;
    background-color: ${colors.LightPrimary};

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        padding: 10px;
    }
`;

export const AddButton = styled.button`
    display: flex;
    background-color: transparent;
    border: 0;
    padding: 5px;
    margin-left: auto;
    color: ${colors.White80};
`;
