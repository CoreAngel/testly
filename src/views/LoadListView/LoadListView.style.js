import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    margin: 0 10px;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        flex-direction: column-reverse;
    }
`;

export const InnerContainer = styled.div``;

export const Header = styled.h2`
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: 0 0 30px 0;
    font-size: 2rem;
`;

export const HeaderText = styled.span`
    margin-left: 10px;
`;

export const BackButtonWrapper = styled.div`
    margin-bottom: 20px;
`;
