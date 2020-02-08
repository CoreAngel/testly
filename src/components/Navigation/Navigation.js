import React from 'react';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import { Container, IconCenter, OptionButton } from './Navigation.style';
import Menu from '../Menu';

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

export default Navigation;
