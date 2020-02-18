import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

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

export const IconStyled = styled(Icon).attrs({
    style: {
        display: 'flex',
    },
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
`;

export const MainFluidContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
