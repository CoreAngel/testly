import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { cross } from 'react-icons-kit/icomoon';
import PropTypes from 'prop-types';
import Backdrop from 'components/Backdrop';
import useEscPress from 'hooks/useEscPress';
import useClickOutside from 'hooks/useClickOutside';
import GlobalStyleContext from 'theme/GlobalStyleContext';
import { IconStyled } from 'utils/style';
import { StaticWrapper, Container, ModalWrapper, ExitButton } from './OptionsModal.style';
import Modal from './Modal';

const OptionsModal = ({ exitOnEscape, exitWithClickOutside, isOpen, setIsOpen }) => {
    const [isLocalOpen, setIsLocalOpen] = useState(false);
    const { setOverflowBody } = useContext(GlobalStyleContext);
    const containerRef = useRef(null);
    const modalRef = useRef(null);
    const animationTime = 200;

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
    }, [isOpen]);

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
                <ModalWrapper ref={modalRef}>
                    <ExitButton onClick={() => setIsOpen(false)}>
                        <IconStyled icon={cross} size={22} />
                    </ExitButton>
                    <Modal />
                </ModalWrapper>
            </Container>
        </StaticWrapper>
    ) : null;
};

OptionsModal.propTypes = {
    exitOnEscape: PropTypes.bool.isRequired,
    exitWithClickOutside: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default OptionsModal;
