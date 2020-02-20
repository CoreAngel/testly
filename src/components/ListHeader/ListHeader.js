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

const ListHeader = ({ list, setTestAction, options, testIndex, testListLength }) => {
    const [error, setError] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const pushToTest = useHistoryPush(routes.Test);

    const runTest = () => {
        setError('');
        const preparedList = prepareTest(list.list, options);
        setTestAction({
            ...list,
            list: preparedList,
        });
        pushToTest();
    };

    const onClickRun = () => {
        if (list === null) {
            setError('Create or load test before run!');
            return;
        }

        const isTestEmpty = testListLength === 0;
        const isTestEnd = testListLength !== 0 && testIndex === testListLength - 1;
        if (!isTestEnd && !isTestEmpty) {
            setIsConfirmOpen(true);
            return;
        }

        runTest();
    };

    const onConfirmExit = status => {
        setIsConfirmOpen(false);
        if (status) {
            runTest();
        }
    };

    return (
        <>
            <MobileContainer>
                {list !== null ? (
                    <ListIdentificationContainer>
                        <ListName>{list.name}</ListName>
                        <ListKey>({list.key})</ListKey>
                    </ListIdentificationContainer>
                ) : null}
                <RunOptionsContainer>
                    <RunOption>Q - {options.questions}</RunOption>
                    <RunOption>A - {options.answers}</RunOption>
                </RunOptionsContainer>
            </MobileContainer>
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
                    <DesktopContainer>
                        {list !== null ? (
                            <ListIdentificationContainer>
                                <ListName>{list.name}</ListName>
                                <ListKey>({list.key})</ListKey>
                            </ListIdentificationContainer>
                        ) : null}
                    </DesktopContainer>
                </Wrapper>
                <Wrapper>
                    <DesktopContainer>
                        <RunOptionsContainer>
                            <RunOption>Q - {options.questions}</RunOption>
                            <RunOption>A - {options.answers}</RunOption>
                        </RunOptionsContainer>
                    </DesktopContainer>
                    <RunButton onClick={onClickRun}>
                        <IconStyled icon={play} size={32} />
                        <LinkText>Run</LinkText>
                    </RunButton>
                    <Confirm isOpen={isConfirmOpen} onExit={onConfirmExit}>
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
    setTestAction: PropTypes.func.isRequired,
    options: optionsProps.isRequired,
    testIndex: PropTypes.number.isRequired,
    testListLength: PropTypes.number.isRequired,
};

ListHeader.defaultProps = {
    list: null,
};

const mapStateToProps = ({ list, test: { index, list: testList }, options }) => ({
    list: list.list.length > 0 ? list : null,
    options,
    testIndex: index,
    testListLength: testList.length,
});

const mapDispatchToProps = {
    setTestAction: setTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader);
