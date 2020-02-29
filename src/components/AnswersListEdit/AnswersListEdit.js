import React from 'react';
import PropTypes from 'prop-types';
import { typesDnD } from 'utils/dragAndDrop';
import { Droppable } from 'react-beautiful-dnd';
import { createAnswerProp } from 'utils/propTypes';
import AnswerEdit from 'components/AnswerEdit';
import { AnswersContainer } from './AnswersListEdit.style';

const AnswersListEdit = ({ answers, questionId }) => {
    return (
        <Droppable droppableId={`${typesDnD.Answers}-${questionId}`}>
            {provided => (
                <AnswersContainer ref={provided.innerRef} {...provided.droppableProps}>
                    {answers.map((item, index) => (
                        <AnswerEdit key={item.lId} answer={item} position={index} questionId={questionId} />
                    ))}
                    {provided.placeholder}
                </AnswersContainer>
            )}
        </Droppable>
    );
};

AnswersListEdit.propTypes = {
    answers: PropTypes.arrayOf(createAnswerProp).isRequired,
    questionId: PropTypes.string.isRequired,
};

export default AnswersListEdit;
