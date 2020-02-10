import React from 'react';
import PropTypes from 'prop-types';
import navigationItems from 'static/navigation';
import { IconStyled } from 'utils/style';
import { NavItem, NavLink, NavList, NavSpan } from './MenuList.style';

const MenuList = ({ isMobile, isOpen, setIsOpen }) => {
    return (
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
    );
};

MenuList.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default MenuList;
