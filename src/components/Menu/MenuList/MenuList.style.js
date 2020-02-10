import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';
import { NavLink as Link } from 'react-router-dom';

export const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        flex-direction: column;
        width: 180px;
        background-color: #1a1a1a;
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
    color: #c1c1c1;

    &.active,
    &:hover {
        color: #ffffff;
    }
`;

export const NavSpan = styled.span`
    margin-left: 8px;
`;
