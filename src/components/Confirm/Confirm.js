import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { childrenProp } from 'utils/propTypes';
import { ButtonsWrapper, Button, Container } from './Confirm.style';
import { colors } from '../../utils/colors';

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
    children: childrenProp.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onExit: PropTypes.func.isRequired,
};

export default Confirm;
