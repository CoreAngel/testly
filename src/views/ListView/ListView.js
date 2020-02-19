import React from 'react';
import { connect } from 'react-redux';
import ListHeader from 'components/ListHeader';
import { listQuestionListProps } from 'utils/propTypes';
import { MainContainer } from 'utils/style';
import QuestionsList from 'components/QuestionsList/QuestionsList';

const ListView = ({ list }) => {
    return (
        <MainContainer>
            <ListHeader />
            {list.length > 0 && <QuestionsList questions={list} />}
        </MainContainer>
    );
};

ListView.propTypes = {
    list: listQuestionListProps.isRequired,
};

const mapStateToProps = ({ list: { list } }) => ({ list });

export default connect(mapStateToProps)(ListView);
