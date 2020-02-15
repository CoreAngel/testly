import React from 'react';
import { connect } from 'react-redux';
import ListNavigation from 'components/ListNavigation';
import { listQuestionListProps } from 'utils/propTypes';
import QuestionsList from 'components/QuestionsList/QuestionsList';

const ListView = ({ list }) => {
    return (
        <>
            <ListNavigation />
            {list.length > 0 && <QuestionsList questions={list} />}
        </>
    );
};

ListView.propTypes = {
    list: listQuestionListProps.isRequired,
};

const mapStateToProps = ({ list: { list } }) => ({
    list,
});

export default connect(mapStateToProps)(ListView);
