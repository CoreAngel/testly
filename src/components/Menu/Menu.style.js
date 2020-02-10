import styled from 'styled-components';
import { maxBreakpoints } from 'utils/breakpoints';

export const Container = styled.div`
    position: ${({ isMobile }) => (isMobile ? 'absolute' : 'static')};
    z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0;
`;

export const NavContainer = styled.nav`
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row-reverse;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        position: absolute;
        height: 100%;
        transform: ${({ isOpen }) => (!isOpen ? 'translateX(-180px)' : 'transform: translateX(0)')};
        transition: transform ease-in-out 200ms;
    }
`;
