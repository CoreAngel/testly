import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ContainerBackDrop, MenuContainer } from './ContainerService.style';
import Menu from './Menu';
import useEscPress from '../../hooks/useEscPress';
import useClickOutside from '../../hooks/useClickOutside';
import useDetectMobile from '../../hooks/useDetectMobile';

const ContainerService = ({ exitOnEscape, exitWithClickOutside }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const menuRef = useRef(null);
    const isMobile = useDetectMobile();

    const callback = () => setIsOpen(false);
    const isEscExitRun = isMobile && exitOnEscape;
    useEscPress(callback, isEscExitRun);

    const isClickOutside = isMobile && exitWithClickOutside;
    useClickOutside({
        callback,
        targetRef: menuRef,
        containerRef,
        isRun: isClickOutside,
    });

    useEffect(() => {
        setIsOpen(false);
    }, [isMobile]);

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
