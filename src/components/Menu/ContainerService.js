import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import keyCodes from 'utils/keyCodes';
import { checkIsMobile } from 'utils/breakpoints';
import { ContainerBackDrop, MenuContainer } from './ContainerService.style';
import Menu from './Menu';

const ContainerService = ({ exitOnEscape, exitWithClickOutside }) => {
    const [isMobile, setIsMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const detectIsMobile = () => {
            const match = checkIsMobile();
            if (match !== isMobile) {
                setIsMobile(match);
                setIsOpen(false);
            }
        };
        detectIsMobile();

        window.addEventListener('resize', detectIsMobile);
        window.addEventListener('orientationchange', detectIsMobile);
        return () => {
            window.removeEventListener('resize', detectIsMobile);
            window.removeEventListener('orientationchange', detectIsMobile);
        };
    }, [isMobile]);

    useEffect(() => {
        if (!exitOnEscape || !containerRef.current) {
            return null;
        }

        const closeOnEscPress = event => {
            if (!isMobile) return;

            const { keyCode } = event;
            if (keyCode === keyCodes.esc) {
                setIsOpen(false);
            }
        };

        const container = containerRef.current;
        container.addEventListener('keydown', closeOnEscPress);

        return () => container.removeEventListener('keydown', closeOnEscPress);
    }, [isMobile, exitOnEscape]);

    useEffect(() => {
        if (!exitWithClickOutside || !containerRef.current || !menuRef.current) {
            return null;
        }

        const closeOnOutsideClick = event => {
            if (!isMobile) return;

            const { target } = event;
            const menu = menuRef.current;

            if (!menu.contains(target)) {
                setIsOpen(false);
            }
        };

        const container = containerRef.current;
        container.addEventListener('click', closeOnOutsideClick);

        return () => container.removeEventListener('click', closeOnOutsideClick);
    }, [isMobile, exitWithClickOutside]);

    return (
        <div>
            <ContainerBackDrop isMobile={isMobile} isOpen={isOpen} ref={containerRef}>
                <MenuContainer ref={menuRef}>
                    <Menu isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
                </MenuContainer>
            </ContainerBackDrop>
        </div>
    );
};

ContainerService.propTypes = {
    exitOnEscape: PropTypes.bool.isRequired,
    exitWithClickOutside: PropTypes.bool.isRequired,
};

export default ContainerService;
