import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import keyCodes from '../../util/keyCodes';
import Menu from './Menu';

const ContainerBackDrop = styled.div`
    z-index: 9999;
    position: ${({ isOpen }) => (isOpen ? 'fixed' : 'static')};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ContainerService = ({ exitOnEscape, exitWithClickOutside }) => {
    const [isMobile, setIsMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const checkIsMobile = () => {
            const { matches } = window.matchMedia('(max-width: 480px)');
            if (matches !== isMobile) {
                setIsMobile(matches);
                setIsOpen(false);
            }
        };
        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);
        window.addEventListener('orientationchange', checkIsMobile);
        return () => {
            window.removeEventListener('resize', checkIsMobile);
            window.removeEventListener('orientationchange', checkIsMobile);
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
