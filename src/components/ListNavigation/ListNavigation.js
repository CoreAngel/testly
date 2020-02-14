import React, { useState } from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { plus, play } from 'react-icons-kit/ikons';
import { IconStyled } from 'utils/style';
import { routes } from 'static/routes';
import { setTest } from 'redux/testReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useHistoryPush from 'hooks/useHistoryPush';
import { runTypes } from 'static/run';
import { prepareTest } from './PrepareTestService';
import { Wrapper, Container, LinkStyled, LinkText, RunButton, Error } from './ListNavigation.style';

const ListNavigation = ({ questions, setTestAction, options }) => {
    const [error, setError] = useState('');
    const pushToTest = useHistoryPush(routes.Test);

    const runTest = () => {
        if (questions.length === 0) {
            setError('Create or load test before run!');
            return;
        }

        setError('');
        const preparedQuestions = prepareTest(questions, options);
        setTestAction(preparedQuestions);
        pushToTest();
    };

    return (
        <>
            <Container>
                <Wrapper>
                    <LinkStyled to={routes.Home}>
                        <IconStyled icon={plus} size={32} />
                        <LinkText>Create</LinkText>
                    </LinkStyled>
                    <LinkStyled to={routes.LoadList}>
                        <IconStyled icon={inboxIn} size={32} />
                        <LinkText>Load</LinkText>
                    </LinkStyled>
                </Wrapper>
                <Wrapper>
                    <RunButton onClick={runTest}>
                        <IconStyled icon={play} size={32} />
                        <LinkText>Run</LinkText>
                    </RunButton>
                </Wrapper>
            </Container>
            {error !== '' && <Error>{error}</Error>}
        </>
    );
};

ListNavigation.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setTestAction: PropTypes.func.isRequired,
    options: PropTypes.shape({
        questions: PropTypes.oneOf([runTypes.RANDOM, runTypes.ORDERED]).isRequired,
        answers: PropTypes.oneOf([runTypes.RANDOM, runTypes.ORDERED]).isRequired,
    }).isRequired,
};

const mapStateToProps = ({ questions, options }) => ({
    questions,
    options,
});

const mapDispatchToProps = {
    setTestAction: setTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNavigation);
