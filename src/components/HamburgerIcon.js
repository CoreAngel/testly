import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
    padding: 5px;
    margin: 20px 0 0 0;
    background-color: transparent;
    border: none;
    height: 30px;
    width: 35px;
`;

const NavIconWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    &::after {
        top: 50%;
        content: '';
        position: absolute;
        left: 0;
        height: 3px;
        width: 100%;
        border-radius: 1px;
        background-color: #fff;
        transition: 200ms;
        transform: translateY(-50%);
        transition-delay: 200ms;

        ${({ isOpen }) =>
            isOpen &&
            css`
                transform: translateY(-50%) translateX(-100%);
                opacity: 0;
                transition-delay: 0ms;
            `}
    }
`;

const NavIcon = styled.div`
    &::after,
    &::before {
        position: absolute;
        content: '';
        left: 0;
        height: 3px;
        width: 100%;
        border-radius: 1px;
        background-color: #fff;
        transition: 200ms;
    }

    &::before {
        top: 0;

        ${({ isOpen }) =>
            isOpen &&
            css`
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
                transition-delay: 200ms;
            `}
    }

    &::after {
        bottom: 0;

        ${({ isOpen }) =>
            isOpen &&
            css`
                bottom: 50%;
                transform: translateY(50%) rotate(-45deg);
                transition-delay: 200ms;
            `}
    }
`;

const VisibilityHidden = styled.span`
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
`;

const HamburgerIcon = ({ isOpen, toggleMenu }) => {
    return (
        <Button aria-expanded={isOpen} onClick={toggleMenu}>
            <NavIconWrapper aria-hidden="true" isOpen={isOpen}>
                <NavIcon isOpen={isOpen} />
            </NavIconWrapper>
            <VisibilityHidden>{isOpen ? 'Close menu' : 'Open menu'}</VisibilityHidden>
        </Button>
    );
};

HamburgerIcon.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerIcon;
