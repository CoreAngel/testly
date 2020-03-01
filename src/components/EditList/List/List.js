import React, { useContext, useEffect, useRef, useState } from 'react';
import TextInput from 'components/TextInput';
import Select from 'components/Select';
import { testTypeItems } from 'static/list';
import Questions from 'components/EditList/Questions';
import { ActionsContext } from 'components/EditList/ActionsContext';
import useDebounce from 'hooks/useDebounce';
import { editProps } from 'utils/propTypes';
import { Container, Row, Wrapper } from './List.style';

const List = ({ list: { name, password, type, questions } }) => {
    const [state, setState] = useState({
        name,
        password,
        type,
    });
    const isInitialMount = useRef(true);
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

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (debouncedState === state) {
            setList(debouncedState);
        }
    }, [debouncedState, setList, state]);

    return (
        <Container>
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
            <Questions questions={questions} />
        </Container>
    );
};

List.propTypes = {
    list: editProps.isRequired,
};

export default List;
