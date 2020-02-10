import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    position: ${({ isMobile }) => (isMobile ? 'fixed' : 'static')};
    top: 0;
    left: 0;
    bottom: 0;
`;

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
