import React from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { plus, play } from 'react-icons-kit/ikons';
import { IconStyled } from 'utils/style';
import { routes } from 'static/routes';
import { Wrapper, Container, LinkStyled, LinkText, RunButton } from './ListNavigation.style';

const ListNavigation = () => {
    return (
        <Container>
            <Wrapper>
                <LinkStyled to={routes.Home}>
                    <IconStyled icon={plus} size={32} />
                    <LinkText>Create</LinkText>
                </LinkStyled>
                <LinkStyled to={routes.LoadList}>
                    <IconStyled icon={inboxIn} size={32} />
                    <LinkText>Load</LinkText>
                </LinkStyled>
            </Wrapper>
            <Wrapper>
                <RunButton onClick={() => {}}>
                    <IconStyled icon={play} size={32} />
                    <LinkText>Run</LinkText>
                </RunButton>
            </Wrapper>
        </Container>
    );
};

export default ListNavigation;
