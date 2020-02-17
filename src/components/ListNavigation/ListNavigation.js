import React, { useState } from 'react';
import { inbox_in as inboxIn } from 'react-icons-kit/ikons/inbox_in';
import { plus, play } from 'react-icons-kit/ikons';
import { IconStyled } from 'utils/style';
import { routes } from 'static/routes';
import { setTest } from 'redux/testReducer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useHistoryPush from 'hooks/useHistoryPush';
import { listProps, optionProps } from 'utils/propTypes';
import { prepareTest } from './PrepareTestService';
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
} from './ListNavigation.style';

const ListNavigation = ({ list, setTestAction, options }) => {
    const [error, setError] = useState('');
    const pushToTest = useHistoryPush(routes.Test);

    const runTest = () => {
        if (list === null) {
            setError('Create or load test before run!');
            return;
        }

        setError('');
        const preparedList = prepareTest(list.list, options);
        setTestAction({
            ...list,
            list: preparedList,
        });
        pushToTest();
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
    list: listProps,
    setTestAction: PropTypes.func.isRequired,
    options: optionProps.isRequired,
};

ListNavigation.defaultProps = {
    list: null,
};

const mapStateToProps = ({ list, options }) => ({
    list: list.list.length > 0 ? list : null,
    options,
});

const mapDispatchToProps = {
    setTestAction: setTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNavigation);
