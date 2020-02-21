import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from 'components/Backdrop';
import useEscPress from 'hooks/useEscPress';
import useClickOutside from 'hooks/useClickOutside';
import GlobalStyleContext from 'theme/GlobalStyleContext';
import { childrenProps } from 'utils/propTypes';
import { StaticWrapper, Container, ModalWrapper } from './Modal.style';

const Modal = ({ children, exitOnEscape, exitWithClickOutside, isOpen, setIsOpen, animationTime }) => {
    const [isLocalOpen, setIsLocalOpen] = useState(false);
    const { setOverflowBody } = useContext(GlobalStyleContext);
    const containerRef = useRef(null);
    const modalRef = useRef(null);

    const callback = useCallback(() => setIsOpen(false), [setIsOpen]);
    const isEscExitRun = isLocalOpen && exitOnEscape;
    useEscPress(callback, isEscExitRun);

    const isClickOutside = isLocalOpen && exitWithClickOutside;
    useClickOutside(callback, modalRef, {
        containerRef,
        isRun: isClickOutside,
    });

    useEffect(() => {
        let timeout;
        if (isOpen) {
            setIsLocalOpen(true);
        } else {
            timeout = setTimeout(() => setIsLocalOpen(false), animationTime);
        }
        return () => clearTimeout(timeout);
    }, [isOpen, animationTime]);

    // @TODO jak znikal scrollbar zmiania sie media query, a w js detectMobile sie nie uruchamial wiec menu sie rozwala
    useEffect(() => {
        if (isLocalOpen) {
            setOverflowBody(null);
        } else {
            setOverflowBody(null);
        }
    }, [isLocalOpen, setOverflowBody]);

    return isLocalOpen ? (
        <StaticWrapper>
            <Backdrop isOpen={isOpen} animationTime={animationTime} />
            <Container isOpen={isOpen} animationTime={animationTime} ref={containerRef}>
                <ModalWrapper ref={modalRef}>{children}</ModalWrapper>
            </Container>
        </StaticWrapper>
    ) : null;
};

Modal.propTypes = {
    children: childrenProps.isRequired,
    exitOnEscape: PropTypes.bool.isRequired,
    exitWithClickOutside: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    animationTime: PropTypes.number,
};

Modal.defaultProps = {
    animationTime: 200,
};

export default Modal;
