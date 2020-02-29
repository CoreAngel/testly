import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ic_keyboard_arrow_down as arrowDown } from 'react-icons-kit/md/ic_keyboard_arrow_down';
import { plus } from 'react-icons-kit/ikons';
import { createQuestionProps } from 'utils/propTypes';
import { IconStyled, VisibilityHidden } from 'utils/style';
import TextInput from 'components/TextInput';
import { Draggable } from 'react-beautiful-dnd';
import { dropAnimationStyles, typesDnD } from 'utils/dragAndDrop';
import { connect } from 'react-redux';
import { addAnswer, setQuestion } from 'redux/createReducer';
import AnswersListEdit from 'components/AnswersListEdit';
import useDebounce from 'hooks/useDebounce';
import {
    Header,
    Container,
    HeaderText,
    HeaderIcon,
    HeaderIndicator,
    Body,
    Row,
    Answers,
    AnswerHeader,
    AddButton,
} from './QuestionEdit.style';

const QuestionEdit = ({ position, question, questionId, addAnswerAction, setQuestionAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({
        q: question.q,
        d: question.d,
    });
    const isInitialMount = useRef(true);
    const debouncedState = useDebounce(state, 200);

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
            setQuestionAction({
                id: Number.parseInt(questionId, 10),
                question: debouncedState,
            });
        }
    }, [debouncedState, setQuestionAction, state, questionId]);

    return (
        <Draggable draggableId={`${typesDnD.Questions}-${questionId}`} index={position}>
            {({ draggableProps, innerRef, dragHandleProps }, snapshot) => {
                // console.log('rerender ' + position);
                return (
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
                                <Answers>
                                    <AnswerHeader>Answers:</AnswerHeader>
                                    <AnswersListEdit questionId={questionId} answers={question.a} />
                                    <AddButton onClick={() => addAnswerAction(position)}>
                                        <VisibilityHidden>Add answer</VisibilityHidden>
                                        <IconStyled icon={plus} size={26} />
                                    </AddButton>
                                </Answers>
                            </Body>
                        )}
                    </Container>
                );
            }}
        </Draggable>
    );
};

QuestionEdit.propTypes = {
    questionId: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    question: createQuestionProps.isRequired,
    addAnswerAction: PropTypes.func.isRequired,
    setQuestionAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    addAnswerAction: addAnswer,
    setQuestionAction: setQuestion,
};

export default connect(null, mapDispatchToProps)(QuestionEdit);
