import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import Menu from './Menu';

const Navigation = () => {
    return (
        <Container>
            <Menu exitOnEscape exitWithClickOutside />
            <OptionButton>
                <IconCenter size={32} icon={androidSettings} />
            </OptionButton>
        </Container>
    );
};

const Container = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;

const IconCenter = styled(Icon).attrs({
    style: {
        display: 'flex',
    },
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionButton = styled.button`
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: #ffffff;
`;

export default Navigation;
