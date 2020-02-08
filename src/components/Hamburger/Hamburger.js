import React from 'react';
import PropTypes from 'prop-types';
import { VisibilityHidden, Button, NavIcon, NavIconWrapper } from './Hamburger.style';

const Hamburger = ({ isOpen, toggleMenu }) => {
    return (
        <Button aria-expanded={isOpen} onClick={toggleMenu}>
            <NavIconWrapper aria-hidden="true" isOpen={isOpen}>
                <NavIcon isOpen={isOpen} />
            </NavIconWrapper>
            <VisibilityHidden>{isOpen ? 'Close menu' : 'Open menu'}</VisibilityHidden>
        </Button>
    );
};

Hamburger.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default Hamburger;
