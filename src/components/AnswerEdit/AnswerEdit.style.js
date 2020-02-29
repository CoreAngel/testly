import styled from 'styled-components';
import { colors } from 'utils/colors';
import { maxBreakpoints } from 'utils/breakpoints';

export const Answer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: ${colors.Primary};

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        flex-direction: column;
    }
`;

export const Reorder = styled.div`
    padding: 5px;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        width: 100%;
    }
`;

export const RadioWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 5px 0 10px;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        margin: 0;
    }
`;
