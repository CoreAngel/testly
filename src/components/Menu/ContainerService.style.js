import styled from 'styled-components';

export const ContainerBackDrop = styled.div`
    z-index: 9999;
    position: ${({ isOpen }) => (isOpen ? 'fixed' : 'static')};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
`;
