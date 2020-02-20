import React, { useState } from 'react';
import { androidSettings } from 'react-icons-kit/ionicons';
import Menu from 'components/Menu';
import Options from 'components/Options';
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
                <Options isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            </OptionButtonWrapper>
        </Container>
    );
};

export default Navigation;
