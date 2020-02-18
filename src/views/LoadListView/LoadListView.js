import React from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { IconStyled, MainContainer } from 'utils/style';
import { loaderItems } from 'static/loader';
import fetchFile from 'utils/fetchFile';
import LoadList from 'components/LoadList';
import useHistoryPush from 'hooks/useHistoryPush';
import { setList } from 'redux/listReducer';
import { routes } from 'static/routes';
import BackButton from 'components/BackButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, HeaderText, BackButtonWrapper } from './LoadListView.style';

const LoadListView = ({ setListAction }) => {
    const pushToList = useHistoryPush(routes.List);

    const loadGlobal = id => {
        fetchFile(id).then(data => {
            setListAction(data);
            pushToList();
        });
    };

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
                <LoadList showKey title="Global" onClick={loadGlobal} items={loaderItems} />
            </Container>
        </MainContainer>
    );
};

LoadListView.propTypes = {
    setListAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    setListAction: setList,
};

export default connect(null, mapDispatchToProps)(LoadListView);
