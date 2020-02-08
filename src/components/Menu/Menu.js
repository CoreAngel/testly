import React from 'react';
import PropTypes from 'prop-types';
import navigationItems from 'static/navigation';
import Hamburger from 'components/Hamburger';
import { NavLink, IconStyled, NavContainer, NavItem, NavList, NavSpan, VisibilityHidden } from './Menu.style';

const Menu = ({ isMobile, isOpen, setIsOpen }) => {
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavContainer isOpen={isOpen}>
            <VisibilityHidden>
                <h2>Menu</h2>
            </VisibilityHidden>
            {isMobile && <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />}
            <NavList>
                {navigationItems.map(item => {
                    const { id, label, icon, path } = item;
                    return (
                        <NavItem key={id}>
                            <NavLink
                                onClick={isMobile ? () => setIsOpen(false) : null}
                                tabIndex={isOpen ? 0 : -1}
                                to={path}
                                exact
                            >
                                <IconStyled size={20} icon={icon} />
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

export default React.memo(Menu);
