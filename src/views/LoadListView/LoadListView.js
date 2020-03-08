import React from 'react';
import PropTypes from 'prop-types';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { IconStyled, MainContainer } from 'utils/style';
import { connect } from 'react-redux';
import LoadList from 'components/LoadList';
import BackButton from 'components/BackButton';
import { addedListProps, listProps } from 'utils/propTypes';
import AddList from 'components/AddList';
import { originType } from 'static/list';
import { deleteList as deleteAddedList } from 'redux/addedListReducer';
import { deleteList as deleteLocalList } from 'redux/localListsReducer';
import { Container, Wrapper, InnerContainer, Header, HeaderText, BackButtonWrapper } from './LoadListView.style';

const LoadListView = ({ global, local, deleteAddedListAction, deleteLocalListAction }) => {
    const globalList = global.map(item => ({ ...item, origin: originType.Server }));
    const localList = local.map(({ key, name }, index) => ({
        id: index,
        key,
        name,
        origin: originType.Local,
    }));

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
                        <LoadList showKey title="Global" items={globalList} deleteAction={deleteAddedListAction} />
                        <LoadList showKey title="Local" items={localList} deleteAction={deleteLocalListAction} />
                    </InnerContainer>
                    <AddList />
                </Wrapper>
            </Container>
        </MainContainer>
    );
};

LoadListView.propTypes = {
    global: addedListProps.isRequired,
    local: PropTypes.arrayOf(listProps).isRequired,
    deleteAddedListAction: PropTypes.func.isRequired,
    deleteLocalListAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ addedList: { items }, localLists: { lists } }) => ({ global: items, local: lists });
const mapDispatchToProps = {
    deleteAddedListAction: deleteAddedList,
    deleteLocalListAction: deleteLocalList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadListView);
