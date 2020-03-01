import React, { useContext } from 'react';
import { editQuestionsProps } from 'utils/propTypes';
import QuestionEdit from 'components/EditList/Question';
import { Droppable } from 'react-beautiful-dnd';
import { typesDnD } from 'utils/dragAndDrop';
import { DnDContext } from 'components/EditList/DnDProvider';
import { IconStyled, VisibilityHidden } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import { ActionsContext } from 'components/EditList/ActionsContext';
import { Container, AddButton } from './Questions.style';

const Questions = ({ questions }) => {
    const { draggableType } = useContext(DnDContext);
    const { addQuestion } = useContext(ActionsContext);
    const isQuestionDroppableDisable = draggableType !== typesDnD.Questions;

    return (
        <Droppable droppableId={typesDnD.Questions} isDropDisabled={isQuestionDroppableDisable}>
            {provided => (
                <Container ref={provided.innerRef} {...provided.droppableProps}>
                    {questions.length > 0 &&
                        questions.map((item, index) => {
                            const { lId } = item;
                            const questionId = `${lId}`;

                            return (
                                <QuestionEdit
                                    key={questionId}
                                    question={item}
                                    questionId={questionId}
                                    position={index}
                                />
                            );
                        })}
                    {provided.placeholder}
                    <AddButton onClick={() => addQuestion()}>
                        <VisibilityHidden>Add question</VisibilityHidden>
                        <IconStyled icon={plus} size={28} />
                    </AddButton>
                </Container>
            )}
        </Droppable>
    );
};

Questions.propTypes = {
    questions: editQuestionsProps.isRequired,
};

export default Questions;
