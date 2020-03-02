import styled from 'styled-components';
import { colors } from 'utils/colors';

export const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 1000;
    width: ${({ isVisible, isActive }) => {
        if (isActive) return '60px';
        if (isVisible) return '40px';
        return 0;
    }};
    background-color: ${({ isActive }) => (isActive ? colors.Red : colors.Red50)};
    transition: width ease-in-out 300ms, background-color ease-in-out 200ms;
`;

export const SmallIcon = styled.div`
    position: fixed;
    width: 20px;
    height: 20px;
    top: 10px;
    left: 100%;
    color: ${colors.White80};
    transition: transform ease-in-out 300ms;
    transform: translateX(${({ isVisible, isActive }) => (isVisible && !isActive ? '-30px' : 0)});
`;

export const BigIcon = styled.div`
    position: fixed;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 100%;
    color: ${colors.White80};
    transform: translateX(${({ isActive }) => (isActive ? '-50px' : 0)});
    transition: color ease-in-out 200ms, transform ease-in-out 300ms;
`;

export const InvisiblePlaceholder = styled.div`
    height: 0;
    width: 0;
    overflow: hidden;
`;
