import React from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { IconStyled, MainContainer } from 'utils/style';
import { connect } from 'react-redux';
import LoadList from 'components/LoadList';
import BackButton from 'components/BackButton';
import { addedListProps } from 'utils/propTypes';
import AddList from 'components/AddList';
import { Container, Wrapper, InnerContainer, Header, HeaderText, BackButtonWrapper } from './LoadListView.style';

const LoadListView = ({ addedList }) => {
    return (
        <MainContainer>
            <Container>
                <BackButtonWrapper>
                    <BackButton label="Back" />
                </BackButtonWrapper>
                <Wrapper>
                    <InnerContainer>
                        <Header>
                            <IconStyled icon={inboxIn} size={28} />
                            <HeaderText>Choose test...</HeaderText>
                        </Header>
                        <LoadList showKey title="Global" items={addedList} />
                    </InnerContainer>
                    <AddList />
                </Wrapper>
            </Container>
        </MainContainer>
    );
};

LoadListView.propTypes = {
    addedList: addedListProps.isRequired,
};

const mapStateToProps = ({ addedList: { items } }) => ({ addedList: items });

export default connect(mapStateToProps)(LoadListView);
