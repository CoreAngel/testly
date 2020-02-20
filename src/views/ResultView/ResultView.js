import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MainContainer } from 'utils/style';
import Question from 'components/Question/Question';
import { testProps } from 'utils/propTypes';
import Toggler from 'components/Toggler';
import { FailedText, Header, NoItemsText, Container } from './ResultView.style';

const ResultView = ({ test: { list, index } }) => {
    const [isAllQuestionVisible, setIsAllQuestionVisible] = useState(false);

    const answeredQuestions = list.slice(0, index);

    const failedQuestions = answeredQuestions.filter(item => item.f);
    const failedCounter = failedQuestions.length;

    const questions = (isAllQuestionVisible ? answeredQuestions : failedQuestions).sort((i1, i2) => i1.id - i2.id);

    return (
        <MainContainer>
            <Header>
                <FailedText>{failedCounter > 0 && `Failed: ${failedCounter}/${index}`}</FailedText>
                <Toggler onChange={setIsAllQuestionVisible} selected={isAllQuestionVisible}>
                    Show all question
                </Toggler>
            </Header>
            <Container>
                {questions.length === 0 && (
                    <NoItemsText>
                        Everything is correct! Keep going{' '}
                        <span role="img" aria-label="thumb up">
                            👍🏻
                        </span>
                    </NoItemsText>
                )}
                {questions.map(({ id, q, a }) => (
                    <Question key={id} number={id + 1} question={q} answers={a} includeSelected />
                ))}
            </Container>
        </MainContainer>
    );
};

ResultView.propTypes = {
    test: testProps.isRequired,
};

const mapStateToProps = ({ test }) => ({ test });

export default connect(mapStateToProps)(ResultView);
