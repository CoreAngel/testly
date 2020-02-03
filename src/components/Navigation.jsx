import React from "react";
import {NavLink as Link} from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { list } from 'react-icons-kit/iconic/list'
import { pencil } from 'react-icons-kit/icomoon/pencil'
import { trophy } from 'react-icons-kit/icomoon/trophy'
import {androidSettings} from 'react-icons-kit/ionicons/androidSettings'

const Navigation = () => {

    return (
        <Container>
            <ContainerNav>
                <NavList>
                    <NavItem>
                        <NavLink to={'/'}>
                            <IconCenter size={20} icon={home} />
                            <NavSpan>Home</NavSpan>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={'/list'}>
                            <IconCenter size={20} icon={list} />
                            <NavSpan>List</NavSpan>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={'/test'}>
                            <IconCenter size={20} icon={pencil} />
                            <NavSpan>Test</NavSpan>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={'/result'}>
                            <IconCenter size={20} icon={trophy} />
                            <NavSpan>Result</NavSpan>
                        </NavLink>
                    </NavItem>
                </NavList>
            </ContainerNav>
            <OptionButton>
                <IconCenter size={32} icon={androidSettings}/>
            </OptionButton>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContainerNav = styled.nav`
    display: flex;
    align-items: center;
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    margin-right: 20px;
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    color: #c1c1c1;
    
    &.active, &:hover {
        color: #ffffff;
    }  
`;

const NavSpan = styled.span`
    margin-left: 8px;
`;

const IconCenter = styled(Icon).attrs({
    style: {
        display: 'flex'
    }
})`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionButton = styled.button`
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    color: #ffffff;
`;

export default Navigation;
