import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'utils/colors';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LinkStyled = styled(Link)`
    color: ${colors.White80};
    text-align: center;
    margin: 0 10px;

    &:hover,
    &:active {
        color: ${colors.White};
        text-decoration: none;
    }
`;

export const RunButton = styled.button`
    background-color: transparent;
    border: 0;
    color: ${colors.White80};
    margin: 0 10px;
    padding: 0;
`;

export const LinkText = styled.span`
    font-size: 1.2rem;
`;

export const Error = styled.p`
    background-color: ${colors.Red};
    color: ${colors.White80};
    font-size: 1.4rem;
    padding: 5px 10px;
    margin: 5px;
`;

export const DesktopContainer = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        display: none;
    }
`;

export const MobileContainer = styled.div`
    display: none;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 15px 10px;
    }
`;

export const ListIdentificationContainer = styled.div`
    margin-left: 15px;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        margin-left: 0;
    }
`;

export const RunOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        margin-left: auto;
    }
`;

export const ListName = styled.p`
    margin: 0;
    font-size: 1.8rem;
`;

export const ListKey = styled.p`
    margin: 0;
    font-size: 1.2rem;
`;

export const RunOption = styled.span`
    margin: 0;
    font-size: 1.2rem;
`;

export const ConfirmText = styled.p`
    margin: 0 0 10px 0;
    padding: 0 10px;
    text-align: center;
`;
