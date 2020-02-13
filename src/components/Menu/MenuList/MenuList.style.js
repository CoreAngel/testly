import styled, { css } from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';
import { NavLink as Link } from 'react-router-dom';
import { colors } from 'utils/colors';

export const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        flex-direction: column;
        width: 180px;
        background-color: ${colors.Dark};
        padding: 10px 0;
    }
`;

export const NavItem = styled.li`
    margin: 0 20px 0 0;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        margin: 10px;
    }
`;

export const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    color: ${colors.White80};

    &.active,
    &:hover {
        color: ${colors.White};
    }

    ${({ disable }) =>
        disable &&
        css`
            color: ${colors.White50};

            &.active,
            &:hover {
                color: ${colors.White50};
                text-decoration: none;
            }
        `}
`;

export const NavSpan = styled.span`
    margin-left: 8px;
`;
