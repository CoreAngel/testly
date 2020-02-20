import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px 10px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
    border: 0;
    padding: 5px 10px;
    margin: 0 5px;
`;
