import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { typesDnD } from 'utils/dragAndDrop';
import { Droppable } from 'react-beautiful-dnd';
import { editAnswerProp } from 'utils/propTypes';
import AnswerEdit from 'components/EditList/Answer';
import { IconStyled, VisibilityHidden } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import { ActionsContext } from 'components/EditList/ActionsContext';
import { AnswersWrapper, AddButton, AnswerHeader, Container } from './Answers.style';

const Answers = ({ answers, questionId, position }) => {
    const { addAnswer } = useContext(ActionsContext);
    return (
        <Droppable droppableId={`${typesDnD.Answers}-${questionId}`}>
            {provided => (
                <Container>
                    <AnswerHeader>Answers:</AnswerHeader>
                    <AnswersWrapper ref={provided.innerRef} {...provided.droppableProps}>
                        {answers.map((item, index) => (
                            <AnswerEdit key={item.lId} answer={item} position={index} questionId={questionId} />
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
    answers: PropTypes.arrayOf(editAnswerProp).isRequired,
    position: PropTypes.number.isRequired,
    questionId: PropTypes.string.isRequired,
};

export default Answers;
