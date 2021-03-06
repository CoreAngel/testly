import React, { useState } from 'react';
import { inbox_in as inboxIn, plus, play } from 'react-icons-kit/ikons';
import { IconStyled } from 'utils/style';
import { routes } from 'static/routes';
import { setTest } from 'redux/testReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useHistoryPush from 'hooks/useHistoryPush';
import { listProps, optionsProps } from 'utils/propTypes';
import Confirm from 'components/Confirm';
import { prepareTest } from 'utils/prepareTestList';
import {
    Wrapper,
    Container,
    LinkStyled,
    LinkText,
    RunButton,
    Error,
    DesktopContainer,
    ListIdentificationContainer,
    ListKey,
    ListName,
    RunOption,
    RunOptionsContainer,
    MobileContainer,
    ConfirmText,
} from './ListHeader.style';

const ListHeader = ({ list, setTestAction, options, testIndex, testQuestionsLength, isShowListInfo }) => {
    const [error, setError] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const pushToTest = useHistoryPush(routes.Test);

    const runTest = () => {
        setError('');
        const preparedList = prepareTest(list.questions, options);
        setTestAction({
            ...list,
            list: preparedList,
        });
        pushToTest();
    };

    const handleClickRun = () => {
        if (list === null) {
            setError('Create or load test before run!');
            return;
        }

        const isTestEmpty = testQuestionsLength === 0;
        const isTestEnd = testQuestionsLength !== 0 && testIndex === testQuestionsLength - 1;
        if (!isTestEnd && !isTestEmpty) {
            setIsConfirmOpen(true);
            return;
        }

        runTest();
    };

    const handleConfirmExit = status => {
        setIsConfirmOpen(false);
        if (status) {
            runTest();
        }
    };

    return (
        <>
            <MobileContainer>
                {isShowListInfo && (
                    <ListIdentificationContainer>
                        <ListName>{list.name}</ListName>
                        <ListKey>({list.key})</ListKey>
                    </ListIdentificationContainer>
                )}
                <RunOptionsContainer>
                    <RunOption>Q - {options.questions}</RunOption>
                    <RunOption>A - {options.answers}</RunOption>
                </RunOptionsContainer>
            </MobileContainer>
            <Container>
                <Wrapper>
                    <LinkStyled to={routes.CreateList}>
                        <IconStyled icon={plus} size={32} />
                        <LinkText>Create</LinkText>
                    </LinkStyled>
                    <LinkStyled to={routes.LoadList}>
                        <IconStyled icon={inboxIn} size={32} />
                        <LinkText>Load</LinkText>
                    </LinkStyled>
                    <DesktopContainer>
                        {isShowListInfo && (
                            <ListIdentificationContainer>
                                <ListName>{list.name}</ListName>
                                <ListKey>({list.key})</ListKey>
                            </ListIdentificationContainer>
                        )}
                    </DesktopContainer>
                </Wrapper>
                <Wrapper>
                    <DesktopContainer>
                        <RunOptionsContainer>
                            <RunOption>Q - {options.questions}</RunOption>
                            <RunOption>A - {options.answers}</RunOption>
                        </RunOptionsContainer>
                    </DesktopContainer>
                    <RunButton onClick={handleClickRun}>
                        <IconStyled icon={play} size={32} />
                        <LinkText>Run</LinkText>
                    </RunButton>
                    <Confirm isOpen={isConfirmOpen} onExit={handleConfirmExit}>
                        <ConfirmText>
                            You didn&apos;t finish the test! Are you sure you want to overwrite it?
                        </ConfirmText>
                    </Confirm>
                </Wrapper>
            </Container>
            {error !== '' && <Error>{error}</Error>}
        </>
    );
};

ListHeader.propTypes = {
    list: listProps,
    isShowListInfo: PropTypes.bool.isRequired,
    setTestAction: PropTypes.func.isRequired,
    options: optionsProps.isRequired,
    testIndex: PropTypes.number.isRequired,
    testQuestionsLength: PropTypes.number.isRequired,
};

ListHeader.defaultProps = {
    list: null,
};

const mapStateToProps = ({ list: { list }, test: { index, questions }, options }) => ({
    list: list.questions.length > 0 ? list : null,
    options,
    testIndex: index,
    testQuestionsLength: questions.length,
});

const mapDispatchToProps = {
    setTestAction: setTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader);
