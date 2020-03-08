import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 10px;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    @media screen and (max-width: 610px) {
        flex-direction: column-reverse;
    }
`;

export const InnerContainer = styled.div`
    flex: 1;
    margin-right: 25px;

    @media screen and (max-width: 610px) {
        margin-right: 0;
    }
`;

export const Header = styled.h2`
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: 0 0 30px 0;
    font-size: 2rem;
`;

export const HeaderText = styled.span`
    margin-left: 10px;
`;

export const BackButtonWrapper = styled.div`
    margin-bottom: 20px;
`;
