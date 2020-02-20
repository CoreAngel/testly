import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { play } from 'react-icons-kit/ikons';
import { MainContainer, IconStyled } from 'utils/style';
import Question from 'components/Question/Question';
import { optionsProps, testProps } from 'utils/propTypes';
import Toggler from 'components/Toggler';
import { prepareTest, clearList } from 'utils/prepareTestList';
import useHistoryPush from 'hooks/useHistoryPush';
import { setList } from 'redux/testReducer';
import { routes } from 'static/routes';
import Confirm from 'components/Confirm';
import {
    FailedText,
    Header,
    NoItemsText,
    Container,
    RunContainer,
    RunOptionsContainer,
    RunOption,
    RunButtonContainer,
    RunButtonText,
    RunButton,
    ConfirmText,
} from './ResultView.style';

const ResultView = ({ test: { list, index, end }, options, setListAction }) => {
    const [isAllQuestionVisible, setIsAllQuestionVisible] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const pushToTest = useHistoryPush(routes.Test);

    const answeredQuestions = end ? [...list] : list.slice(0, index);

    const failedQuestions = answeredQuestions.filter(item => item.f);
    const failedCounter = failedQuestions.length;

    const questions = (isAllQuestionVisible ? answeredQuestions : failedQuestions).sort((i1, i2) => i1.id - i2.id);

    const runTestWithFails = status => {
        if (!status) return;

        const clearTestList = clearList(failedQuestions);
        const preparedList = prepareTest(clearTestList, options);
        setListAction(preparedList);
        pushToTest();
    };

    return (
        <MainContainer>
            <Header>
                <FailedText>{failedCounter > 0 && `Failed: ${failedCounter}/${answeredQuestions.length}`}</FailedText>
                <Toggler onChange={setIsAllQuestionVisible} selected={isAllQuestionVisible}>
                    Show all question
                </Toggler>
            </Header>
            {failedCounter > 0 && (
                <RunContainer>
                    <RunOptionsContainer>
                        <RunOption>Q - {options.questions}</RunOption>
                        <RunOption>A - {options.answers}</RunOption>
                    </RunOptionsContainer>
                    <RunButtonContainer>
                        <RunButtonText>Run with fails</RunButtonText>
                        <RunButton onClick={() => setIsConfirmOpen(true)}>
                            <IconStyled icon={play} size={36} />
                        </RunButton>
                    </RunButtonContainer>
                    <Confirm onExit={runTestWithFails} isOpen={isConfirmOpen}>
                        <ConfirmText>Are you sure?</ConfirmText>
                    </Confirm>
                </RunContainer>
            )}
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
    options: optionsProps.isRequired,
    setListAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ test, options }) => ({ test, options });
const mapDispatchToProps = {
    setListAction: setList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultView);
