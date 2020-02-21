import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { childrenProps } from 'utils/propTypes';
import { colors } from 'utils/colors';
import { ButtonsWrapper, Button, Container } from './Confirm.style';

const Confirm = ({ children, isOpen, onExit }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isLocalOpen, setIsLocalOpen] = useState(isOpen);
    const animationTime = 200;

    useEffect(() => {
        if (isOpen) {
            setIsClicked(false);
        } else {
            setIsClicked(true);
        }
        setIsLocalOpen(isOpen);
    }, [isOpen, setIsClicked, setIsLocalOpen]);

    const onLocalExit = (value, delay) => {
        if (!isClicked) {
            if (delay) {
                setTimeout(() => onExit(value), animationTime);
            } else {
                onExit(value);
            }
            setIsClicked(true);
        }
    };

    return (
        <Modal
            isOpen={isLocalOpen}
            setIsOpen={() => onLocalExit(false, false)}
            animationTime={animationTime}
            exitOnEscape
            exitWithClickOutside
        >
            <Container>
                {children}
                <ButtonsWrapper>
                    <Button bgColor={colors.Green50} color={colors.White80} onClick={() => onLocalExit(true, true)}>
                        Confirm
                    </Button>
                    <Button bgColor={colors.Red50} color={colors.White80} onClick={() => onLocalExit(false, true)}>
                        Cancel
                    </Button>
                </ButtonsWrapper>
            </Container>
        </Modal>
    );
};

Confirm.propTypes = {
    children: childrenProps.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onExit: PropTypes.func.isRequired,
};

export default Confirm;
