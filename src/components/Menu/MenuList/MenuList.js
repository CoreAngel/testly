import React from 'react';
import PropTypes from 'prop-types';
import navigationItems from 'static/navigation';
import { routes } from 'static/routes';
import { IconStyled } from 'utils/style';
import { connect } from 'react-redux';
import { testProps } from 'utils/propTypes';
import { NavItem, NavLink, NavList, NavSpan } from './MenuList.style';

const MenuList = ({ isMobile, isOpen, setIsOpen, test: { questions, index, end }, listKey, listOrigin }) => {
    const isTestEmpty = questions.length === 0;
    const isIndexZeroAndTestNotEnd = index === 0 && !end;
    const routesDisabled = {
        [routes.Test]: isTestEmpty,
        [routes.Result]: isTestEmpty || isIndexZeroAndTestNotEnd,
    };
    const params = {
        [routes.List]: `/${listOrigin}/${listKey}`,
    };

    const navigationItemsWithParams = navigationItems.map(item => {
        if (Object.prototype.hasOwnProperty.call(params, item.path)) {
            return {
                ...item,
                path: `${item.path}${params[item.path]}`,
            };
        }
        return item;
    });

    const handleActiveClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

    const handleDisableClick = e => {
        e.preventDefault();
    };

    return (
        <NavList>
            {navigationItemsWithParams.map(item => {
                const { id, label, icon, path } = item;
                const isRouteDisabled = !!routesDisabled[path];
                const isAbleToFocus = (!isMobile || isOpen) && !isRouteDisabled;

                return (
                    <NavItem key={id}>
                        <NavLink
                            onClick={isRouteDisabled ? handleDisableClick : handleActiveClick}
                            tabIndex={isAbleToFocus ? 0 : -1}
                            disable={isRouteDisabled ? 1 : 0}
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
    test: testProps.isRequired,
    listKey: PropTypes.string.isRequired,
    listOrigin: PropTypes.string.isRequired,
};

const mapStateToProps = ({
    test,
    list: {
        list: { key, origin },
    },
}) => ({ test, listKey: key, listOrigin: origin });

export default connect(mapStateToProps)(MenuList);
