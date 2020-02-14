import React, { useState } from 'react';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import Menu from 'components/Menu';
import OptionsModal from 'components/OptionsModal';
import { IconStyled } from 'utils/style';
import { Container, OptionButton, OptionButtonWrapper } from './Navigation.style';

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Container>
            <Menu exitOnEscape exitWithClickOutside />
            <OptionButtonWrapper>
                <OptionButton onClick={() => setIsModalOpen(true)}>
                    <IconStyled size={32} icon={androidSettings} />
                </OptionButton>
                <OptionsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} exitWithClickOutside exitOnEscape />
            </OptionButtonWrapper>
        </Container>
    );
};

export default Navigation;
