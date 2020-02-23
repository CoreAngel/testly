import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Wrapper = styled.div`
    animation: ${animation} 1s infinite;
`;
