import React from 'react';
import PropTypes from 'prop-types';
import navigationItems from 'static/navigation';
import { routes } from 'static/routes';
import { IconStyled } from 'utils/style';
import { useSelector } from 'react-redux';
import { NavItem, NavLink, NavList, NavSpan } from './MenuList.style';

const MenuList = ({ isMobile, isOpen, setIsOpen }) => {
    const isTestEmpty = useSelector(({ test: { list } }) => list.length === 0);
    const routesToDisableWhenTestEmpty = [routes.Test, routes.Result];

    return (
        <NavList>
            {navigationItems.map(item => {
                const { id, label, icon, path } = item;
                const isRouteDisabled = isTestEmpty && routesToDisableWhenTestEmpty.some(elem => elem === path) ? 1 : 0;
                const onClick = e => {
                    if (isRouteDisabled) {
                        e.preventDefault();
                    }
                    if (isMobile) {
                        setIsOpen(false);
                    }
                };

                return (
                    <NavItem key={id}>
                        <NavLink onClick={onClick} tabIndex={isOpen ? 0 : -1} disable={isRouteDisabled} to={path} exact>
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
