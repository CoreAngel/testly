import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import PropTypes from 'prop-types';
import navigationItems from '../../static/navigation';

const Menu = ({ isMobile, isOpen, setIsOpen }) => {
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavContainer isMobile={isMobile} isOpen={isOpen}>
            <VisibilityHidden>
                <h2>Menu</h2>
            </VisibilityHidden>
            {isMobile && (
                <Button aria-expanded={isOpen} onClick={toggleMenu}>
                    <NavIcon aria-hidden="true" isOpen={isOpen}>
                        <span />
                        <span />
                        <span />
                    </NavIcon>
                    <VisibilityHidden>{isOpen ? 'Close menu' : 'Open menu'}</VisibilityHidden>
                </Button>
            )}
            <NavList isMobile={isMobile}>
                {navigationItems.map(item => {
                    const { id, label, icon, path } = item;
                    return (
                        <NavItem isMobile={isMobile} key={id}>
                            <NavLink
                                onClick={isMobile ? () => setIsOpen(false) : null}
                                tabIndex={isOpen ? 0 : -1}
                                to={path}
                                exact
                            >
                                <IconCenter size={20} icon={icon} />
                                <NavSpan>{label}</NavSpan>
                            </NavLink>
                        </NavItem>
                    );
                })}
            </NavList>
        </NavContainer>
    );
};

Menu.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

const NavContainer = styled.nav(({ isMobile, isOpen }) => ({
    position: isMobile ? 'fixed' : 'static',
    height: isMobile ? '100vh' : 'auto',
    transform: isMobile && (!isOpen ? 'translateX(-180px)' : 'transform: translateX(0)'),
    transition: isMobile ? 'transform ease-in-out 200ms;' : null,
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row-reverse',
}));

const Button = styled.button`
    padding: 5px;
    margin: 20px 0 0 0;
    background-color: transparent;
    border: none;
    height: 30px;
    width: 35px;
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

const NavIcon = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    & span {
        position: absolute;
        left: 0;
        height: 3px;
        border-radius: 1px;
        width: 100%;
        background-color: #fff;
        transition: 200ms;
    }

    & span:nth-child(1) {
        top: ${({ isOpen }) => (isOpen ? '50%' : '0')};
        transform: ${({ isOpen }) => isOpen && 'translateY(-50%) rotate(45deg)'};
        ${({ isOpen }) => isOpen && 'transition-delay: 200ms'};
    }

    & span:nth-child(2) {
        top: 50%;
        transform: translateY(-50%) ${({ isOpen }) => (isOpen ? 'translateX(-100%)' : 'translateX(0)')};
        opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
        ${({ isOpen }) => !isOpen && 'transition-delay: 200ms'};
    }

    & span:nth-child(3) {
        bottom: ${({ isOpen }) => (isOpen ? '50%' : '0')};
        transform: ${({ isOpen }) => isOpen && 'translateY(50%) rotate(-45deg)'};
        ${({ isOpen }) => isOpen && 'transition-delay: 200ms'};
    }
`;

const NavList = styled.ul(({ isMobile }) => ({
    listStyleType: 'none',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    width: isMobile ? '180px' : 'auto',
    backgroundColor: isMobile ? '#1a1a1a' : 'transparent',
    padding: isMobile ? '10px 0' : '0',
    margin: 0,
}));

const NavItem = styled.li`
    margin: ${({ isMobile }) => (isMobile ? '10px' : '0 20px 0 0')};
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    color: #c1c1c1;

    &.active,
    &:hover {
        color: #ffffff;
    }
`;

const NavSpan = styled.span`
    margin-left: 8px;
`;

const IconCenter = styled(Icon).attrs({
    style: {
        display: 'flex',
    },
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default React.memo(Menu);
