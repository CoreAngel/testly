import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import PropTypes from 'prop-types';
import navigationItems from '../../static/navigation';
import { maxBreakpoints } from '../../util/breakpoints';
import HamburgerIcon from '../HamburgerIcon';

const NavContainer = styled.nav`
    position: static;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row-reverse;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        position: fixed;
        height: 100vh;
        transform: ${({ isOpen }) => (!isOpen ? 'translateX(-180px)' : 'transform: translateX(0)')};
        transition: transform ease-in-out 200ms;
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

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        flex-direction: column;
        width: 180px;
        background-color: #1a1a1a;
        padding: 10px 0;
    }
`;

const NavItem = styled.li`
    margin: 0 20px 0 0;

    @media (max-width: ${maxBreakpoints.mobile}px) {
        margin: 10px;
    }
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

const IconStyled = styled(Icon).attrs({
    style: {
        display: 'flex',
    },
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Menu = ({ isMobile, isOpen, setIsOpen }) => {
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavContainer isOpen={isOpen}>
            <VisibilityHidden>
                <h2>Menu</h2>
            </VisibilityHidden>
            {isMobile && <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />}
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
