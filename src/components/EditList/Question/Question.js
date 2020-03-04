import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ic_keyboard_arrow_down as arrowDown } from 'react-icons-kit/md/ic_keyboard_arrow_down';
import { editQuestionProps } from 'utils/propTypes';
import { IconStyled } from 'utils/style';
import TextInput from 'components/TextInput';
import { Draggable } from 'react-beautiful-dnd';
import { dropAnimationStyles, typesDnD } from 'utils/dragAndDrop';
import Answers from 'components/EditList/Answers';
import useDebounce from 'hooks/useDebounce';
import { ActionsContext } from 'components/EditList/ActionsContext';
import { ErrorWrapper } from 'components/EditList/InputErrorWrapper/InputErrorWrapper.style';
import InputErrorWrapper from 'components/EditList/InputErrorWrapper';
import { Header, Container, HeaderText, HeaderIcon, HeaderIndicator, Body, Row } from './Question.style';

const Question = ({
    position,
    question: { q: question, d: description, a: answersObj, error, warning },
    questionId,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({ q: question.item, d: description.item });
    const prevDebouncedState = useRef(state);
    const { debounce, setQuestion } = useContext(ActionsContext);
    const debouncedState = useDebounce(state, debounce);

    const toggle = () => setIsOpen(prev => !prev);

    const handleTextChange = ({ target }) => {
        setState(prev => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const compareStates = (firstState, secondState) => {
        return firstState.q !== secondState.q || firstState.d !== secondState.d;
    };

    useEffect(() => {
        const isTyping = state !== debouncedState;
        const localStateChanged = compareStates(debouncedState, prevDebouncedState.current);
        const propsAreDifferentThanState = compareStates(state, { q: question.item, d: description.item });

        if (!isTyping && !localStateChanged && propsAreDifferentThanState) {
            setState({ q: question.item, d: description.item });
        } else if (localStateChanged && propsAreDifferentThanState) {
            prevDebouncedState.current = debouncedState;
            setQuestion({
                id: Number.parseInt(questionId, 10),
                question: debouncedState,
            });
        }
    }, [question, description, questionId, state, debouncedState, setQuestion]);

    return (
        <Draggable draggableId={`${typesDnD.Questions}-${questionId}`} index={position}>
            {({ draggableProps, innerRef, dragHandleProps }, snapshot) => (
                <Container
                    {...draggableProps}
                    isDragging={snapshot.isDragging}
                    ref={innerRef}
                    style={dropAnimationStyles(draggableProps.style, snapshot)}
                >
                    <ErrorWrapper error={error} warning={warning}>
                        <Header onClick={() => toggle(questionId)} {...dragHandleProps}>
                            <HeaderIndicator>{`${position + 1}.`}</HeaderIndicator>
                            <HeaderText>{state.q}</HeaderText>
                            <HeaderIcon isOpen={isOpen}>
                                <IconStyled icon={arrowDown} size={25} />
                            </HeaderIcon>
                        </Header>
                        {isOpen && (
                            <Body>
                                <Row>
                                    <InputErrorWrapper item={question}>
                                        <TextInput
                                            placeholder="Question"
                                            onChange={handleTextChange}
                                            name="q"
                                            value={state.q}
                                        />
                                    </InputErrorWrapper>
                                </Row>
                                <Row>
                                    <InputErrorWrapper item={description}>
                                        <TextInput
                                            placeholder="Description"
                                            onChange={handleTextChange}
                                            name="d"
                                            value={state.d}
                                        />
                                    </InputErrorWrapper>
                                </Row>
                                <Answers questionId={questionId} answers={answersObj} position={position} />
                            </Body>
                        )}
                    </ErrorWrapper>
                </Container>
            )}
        </Draggable>
    );
};

Question.propTypes = {
    question: editQuestionProps.isRequired,
    questionId: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
};

export default Question;
