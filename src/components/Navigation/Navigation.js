import React from 'react';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import Menu from 'components/Menu';
import { Container, IconCenter, OptionButton } from './Navigation.style';

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
