import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { typesDnD } from 'utils/dragAndDrop';
import { Droppable } from 'react-beautiful-dnd';
import { editAnswersObjProps } from 'utils/propTypes';
import Answer from 'components/EditList/Answer';
import { IconStyled, VisibilityHidden } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import { ActionsContext } from 'components/EditList/ActionsContext';
import { ErrorInfo } from 'components/EditList/InputErrorWrapper/InputErrorWrapper.style';
import { AnswersWrapper, AddButton, AnswerHeader, Container } from './Answers.style';

const Answers = ({ answers: { answers, errors, warnings }, questionId, position }) => {
    const { addAnswer } = useContext(ActionsContext);
    return (
        <Droppable droppableId={`${typesDnD.Answers}-${questionId}`}>
            {provided => (
                <Container>
                    <AnswerHeader>Answers:</AnswerHeader>
                    {errors.map((text, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <ErrorInfo key={index} error>
                            {text}
                        </ErrorInfo>
                    ))}
                    {warnings.map((text, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <ErrorInfo key={index} warning>
                            {text}
                        </ErrorInfo>
                    ))}
                    <AnswersWrapper ref={provided.innerRef} {...provided.droppableProps}>
                        {answers.map((item, index) => (
                            <Answer key={item.lId} answer={item} position={index} questionId={questionId} />
                        ))}
                        {provided.placeholder}
                    </AnswersWrapper>
                    <AddButton onClick={() => addAnswer(position)}>
                        <VisibilityHidden>Add answer</VisibilityHidden>
                        <IconStyled icon={plus} size={26} />
                    </AddButton>
                </Container>
            )}
        </Droppable>
    );
};

Answers.propTypes = {
    answers: editAnswersObjProps.isRequired,
    position: PropTypes.number.isRequired,
    questionId: PropTypes.string.isRequired,
};

export default Answers;
