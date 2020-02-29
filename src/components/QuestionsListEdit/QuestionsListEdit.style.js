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

export const InvisiblePlaceholder = styled.div`
    height: 0;
    width: 0;
    overflow: hidden;
`;
