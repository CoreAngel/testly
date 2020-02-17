import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
`;

export const Button = styled.button`
    background-color: transparent;
    border: 0;
    margin: 0;
    color: ${({ disabled }) => (disabled ? colors.White50 : colors.White80)};
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Position = styled.p`
    font-size: 2.4rem;
    margin: 0 10px 0 0;
    display: flex;
    align-items: center;
`;

export const Name = styled.p`
    display: flex;
    margin: 0;
    font-size: 1.8rem;
`;

export const Key = styled.p`
    display: flex;
    margin: 0;
    font-size: 1.2rem;
`;
