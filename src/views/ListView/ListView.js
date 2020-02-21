import React from 'react';
import { connect } from 'react-redux';
import ListHeader from 'components/ListHeader';
import { listQuestionListProps } from 'utils/propTypes';
import { MainContainer } from 'utils/style';
import QuestionsList from 'components/QuestionsList/QuestionsList';
import BackToTopButton from 'components/BackToTopButton';
import { Container } from './ListView.style';

const ListView = ({ list }) => {
    return (
        <MainContainer>
            <Container>
                <ListHeader />
                {list.length > 0 && <QuestionsList questions={list} />}
                <BackToTopButton offset={300} />
            </Container>
        </MainContainer>
    );
};

ListView.propTypes = {
    list: listQuestionListProps.isRequired,
};

const mapStateToProps = ({ list: { list } }) => ({ list });

export default connect(mapStateToProps)(ListView);
