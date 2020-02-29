import React, { useEffect, useRef, useState } from 'react';
import { MainContainer, IconStyled, VisibilityHidden } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import TextInput from 'components/TextInput';
import PropTypes from 'prop-types';
import Select from 'components/Select';
import { testTypeItems } from 'static/list';
import { connect } from 'react-redux';
import QuestionsListEdit from 'components/QuestionsListEdit';
import { addQuestion, setList } from 'redux/createReducer';
import { createProps } from 'utils/propTypes';
import useDebounce from 'hooks/useDebounce';
import { Container, HeaderText, Header, Row, Wrapper, AddButton } from './CreateListView.style';

const CreateListView = ({ create: { name, password, type, questions }, addQuestionAction, setListAction }) => {
    const [state, setState] = useState({
        name,
        password,
        type,
    });
    const isInitialMount = useRef(true);
    const debouncedState = useDebounce(state, 200);

    const handleTextChange = ({ target }) => {
        setState(prev => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleSelectChange = ({ value }) => {
        setState(prev => ({
            ...prev,
            type: value,
        }));
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (debouncedState === state) {
            setListAction(debouncedState);
        }
    }, [debouncedState, setListAction, state]);

    return (
        <MainContainer>
            <Container>
                <Header>
                    <IconStyled icon={plus} size={28} />
                    <HeaderText>Create test</HeaderText>
                </Header>
                <Wrapper>
                    <Row>
                        <TextInput placeholder="Name" onChange={handleTextChange} name="name" value={state.name} />
                    </Row>
                    <Row>
                        <TextInput
                            placeholder="Password"
                            type="text"
                            onChange={handleTextChange}
                            name="password"
                            value={state.password}
                        />
                    </Row>
                    <Row>
                        <Select
                            label="List type"
                            items={testTypeItems}
                            onChange={handleSelectChange}
                            defaultValue={state.type}
                        />
                    </Row>
                </Wrapper>
                <QuestionsListEdit questions={questions} />
                <Row>
                    <AddButton onClick={() => addQuestionAction()}>
                        <VisibilityHidden>Add question</VisibilityHidden>
                        <IconStyled icon={plus} size={28} />
                    </AddButton>
                </Row>
            </Container>
        </MainContainer>
    );
};

CreateListView.propTypes = {
    create: createProps.isRequired,
    addQuestionAction: PropTypes.func.isRequired,
    setListAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ create }) => ({ create });

const mapDispatchToProps = {
    addQuestionAction: addQuestion,
    setListAction: setList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListView);
