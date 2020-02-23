import React from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { IconStyled, MainContainer } from 'utils/style';
import { loaderItems } from 'static/loader';
import LoadList from 'components/LoadList';
import BackButton from 'components/BackButton';
import { Container, Header, HeaderText, BackButtonWrapper } from './LoadListView.style';

const LoadListView = () => {
    return (
        <MainContainer>
            <Container>
                <BackButtonWrapper>
                    <BackButton label="Back" />
                </BackButtonWrapper>
                <Header>
                    <IconStyled icon={inboxIn} size={28} />
                    <HeaderText>Choose test...</HeaderText>
                </Header>
                <LoadList showKey title="Global" items={loaderItems} />
            </Container>
        </MainContainer>
    );
};

export default LoadListView;
