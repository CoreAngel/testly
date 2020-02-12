import React from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { IconStyled } from 'utils/style';
import { loaderItems } from 'static/loader';
import fetchFile from 'utils/fetchFile';
import LoadList from 'components/LoadList';
import useHistoryPush from 'hooks/useHistoryPush';
import { setQuestions } from 'redux/questionStore';
import { routes } from 'static/routes';
import BackButton from 'components/BackButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, HeaderText, BackButtonWrapper } from './LoadListView.style';

const LoadListView = ({ setQuestionsAction }) => {
    const pushToList = useHistoryPush(routes.List);

    const loadGlobal = id => {
        fetchFile(id).then(data => {
            setQuestionsAction(data);
            pushToList();
        });
    };

    return (
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
    );
};

LoadListView.propTypes = {
    setQuestionsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    setQuestionsAction: setQuestions,
};

export default connect(null, mapDispatchToProps)(LoadListView);
