import React, { useContext, useEffect, useRef, useState } from 'react';
import TextInput from 'components/TextInput';
import Select from 'components/Select';
import { testTypeItems } from 'static/list';
import Questions from 'components/EditList/Questions';
import { ActionsContext } from 'components/EditList/ActionsContext';
import useDebounce from 'hooks/useDebounce';
import { editProps } from 'utils/propTypes';
import InputErrorWrapper from 'components/EditList/InputErrorWrapper';
import { Container, Row, Wrapper } from './List.style';

const List = ({ list: { name, password, type, questions } }) => {
    const [state, setState] = useState({ name: name.item, password: password.item, type });
    const prevDebouncedState = useRef(state);
    const { debounce, setList } = useContext(ActionsContext);
    const debouncedState = useDebounce(state, debounce);

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

    const compareStates = (firstState, secondState) => {
        return (
            firstState.name !== secondState.name ||
            firstState.password !== secondState.password ||
            firstState.type !== secondState.type
        );
    };

    useEffect(() => {
        const isTyping = state !== debouncedState;
        const localStateChanged = compareStates(debouncedState, prevDebouncedState.current);
        const propsAreDifferentThanState = compareStates(state, { name: name.item, password: password.item, type });

        if (!isTyping && !localStateChanged && propsAreDifferentThanState) {
            setState({ name: name.item, password: password.item, type });
        } else if (localStateChanged && propsAreDifferentThanState) {
            prevDebouncedState.current = debouncedState;
            setList(debouncedState);
        }
    }, [name, password, type, state, debouncedState, setList]);

    return (
        <Container>
            <Wrapper>
                <Row>
                    <InputErrorWrapper item={name}>
                        <TextInput placeholder="Name" onChange={handleTextChange} name="name" value={state.name} />
                    </InputErrorWrapper>
                </Row>
                <Row>
                    <InputErrorWrapper item={password}>
                        <TextInput
                            placeholder="Password"
                            onChange={handleTextChange}
                            name="password"
                            value={state.password}
                        />
                    </InputErrorWrapper>
                </Row>
                <Row>
                    <Select label="List type" items={testTypeItems} onChange={handleSelectChange} value={state.type} />
                </Row>
            </Wrapper>
            <Questions questions={questions} />
        </Container>
    );
};

List.propTypes = {
    list: editProps.isRequired,
};

export default List;
