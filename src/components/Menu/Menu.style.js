import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        position: absolute;
    }
`;

export const NavContainer = styled.nav`
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row-reverse;
    position: relative;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        position: absolute;
        height: 100%;
        transform: ${({ isOpen }) => (!isOpen ? 'translateX(-180px)' : 'transform: translateX(0)')};
        transition: transform ease-in-out 200ms;
    }
`;

export const HamburgerWrapper = styled.div`
    position: absolute;
    display: none;
    top: 20px;
    left: 100%;
    padding-left: 10px;

    @media screen and (max-width: ${maxBreakpoints.mobile}px) {
        display: block;
    }
`;
