import React from 'react';
import { connect } from 'react-redux';
import ListHeader from 'components/ListHeader';
import { listQuestionsProps } from 'utils/propTypes';
import { MainContainer } from 'utils/style';
import QuestionsList from 'components/QuestionsList/QuestionsList';
import BackToTopButton from 'components/BackToTopButton';
import { Container } from './ListView.style';

const ListView = ({ questions }) => {
    return (
        <MainContainer>
            <Container>
                <ListHeader />
                {questions.length > 0 && <QuestionsList questions={questions} />}
                <BackToTopButton offset={300} />
            </Container>
        </MainContainer>
    );
};

ListView.propTypes = {
    questions: listQuestionsProps.isRequired,
};

const mapStateToProps = ({
    list: {
        list: { questions },
    },
}) => ({ questions });

export default connect(mapStateToProps)(ListView);
