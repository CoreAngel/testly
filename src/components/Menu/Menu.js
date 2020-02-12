import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Hamburger from 'components/Hamburger';
import Backdrop from 'components/Backdrop';
import MenuList from 'components/Menu/MenuList';
import useDetectMobile from 'hooks/useDetectMobile';
import useEscPress from 'hooks/useEscPress';
import useClickOutside from 'hooks/useClickOutside';
import { VisibilityHidden } from 'utils/style';
import { NavContainer, Container, HamburgerWrapper } from './Menu.style';

const Menu = ({ exitOnEscape, exitWithClickOutside }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const menuRef = useRef(null);
    const isMobile = useDetectMobile();

    const callback = useCallback(() => setIsOpen(false), []);
    const isEscExitRun = isMobile && exitOnEscape;
    useEscPress(callback, isEscExitRun);

    const isClickOutside = isMobile && exitWithClickOutside;
    useClickOutside(callback, menuRef, {
        containerRef,
        isRun: isClickOutside,
    });

    useEffect(() => {
        setIsOpen(false);
    }, [isMobile]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Container isMobile={isMobile} isOpen={isOpen}>
                <Backdrop isOpen={isOpen} animationTime={200} ref={containerRef} />
                <NavContainer ref={menuRef} isOpen={isOpen}>
                    <VisibilityHidden as="h2">Menu</VisibilityHidden>
                    {isMobile && (
                        <HamburgerWrapper>
                            <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />
                        </HamburgerWrapper>
                    )}
                    <MenuList isMobile={isMobile} setIsOpen={setIsOpen} isOpen={isOpen} />
                </NavContainer>
            </Container>
        </div>
    );
};

Menu.propTypes = {
    exitOnEscape: PropTypes.bool.isRequired,
    exitWithClickOutside: PropTypes.bool.isRequired,
};

export default React.memo(Menu);
