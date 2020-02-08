import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { maxBreakpoints } from '../../util/breakpoints';

export const NavContainer = styled.nav`
    position: static;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row-reverse;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        position: fixed;
        height: 100vh;
        transform: ${({ isOpen }) => (!isOpen ? 'translateX(-180px)' : 'transform: translateX(0)')};
        transition: transform ease-in-out 200ms;
    }
`;

export const VisibilityHidden = styled.span`
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
`;

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

export const IconStyled = styled(Icon).attrs({
    style: {
        display: 'flex',
    },
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;
