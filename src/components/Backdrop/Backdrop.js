import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { BackdropStyled, Container } from './Backdrop.style';

const Backdrop = forwardRef(({ isOpen, animationTime }, ref) => {
    const [isLocalOpen, setIsLocalOpen] = useState(false);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isOpen);

        let timeout = null;
        if (isOpen) {
            setIsLocalOpen(isOpen);
        } else {
            timeout = setTimeout(() => setIsLocalOpen(isOpen), animationTime);
        }

        return () => clearTimeout(timeout);
    }, [isOpen, animationTime]);

    return (
        <Container isOpen={isLocalOpen} ref={ref}>
            {isLocalOpen ? <BackdropStyled isVisible={isVisible} animationTime={animationTime} /> : null}
        </Container>
    );
});

Backdrop.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    animationTime: PropTypes.number,
};

Backdrop.defaultProps = {
    animationTime: 0,
};

export default Backdrop;
