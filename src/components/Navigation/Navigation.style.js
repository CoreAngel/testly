import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

export const Container = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;

export const IconCenter = styled(Icon).attrs({
    style: {
        display: 'flex',
    },
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OptionButton = styled.button`
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: #ffffff;
`;
