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
import { Header, Container, HeaderText, HeaderIcon, HeaderIndicator, Body, Row } from './Question.style';
import { ActionsContext } from '../ActionsContext';

const Question = ({ position, question: { q: question, d: description, a: answers }, questionId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({ q: question, d: description });
    const isInitialMount = useRef(true);
    const { debounce, setQuestion } = useContext(ActionsContext);
    const debouncedState = useDebounce(state, debounce);

    const toggle = () => setIsOpen(prev => !prev);

    const handleTextChange = ({ target }) => {
        setState(prev => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (debouncedState === state) {
            setQuestion({
                id: Number.parseInt(questionId, 10),
                question: debouncedState,
            });
        }
    }, [debouncedState, setQuestion, state, questionId]);

    return (
        <Draggable draggableId={`${typesDnD.Questions}-${questionId}`} index={position}>
            {({ draggableProps, innerRef, dragHandleProps }, snapshot) => (
                <Container
                    {...draggableProps}
                    isDragging={snapshot.isDragging}
                    ref={innerRef}
                    style={dropAnimationStyles(draggableProps.style, snapshot)}
                >
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
                                <TextInput
                                    placeholder="Question"
                                    onChange={handleTextChange}
                                    name="q"
                                    value={state.q}
                                />
                            </Row>
                            <Row>
                                <TextInput
                                    placeholder="Description"
                                    onChange={handleTextChange}
                                    name="d"
                                    value={state.d}
                                />
                            </Row>
                            <Answers questionId={questionId} answers={answers} position={position} />
                        </Body>
                    )}
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
