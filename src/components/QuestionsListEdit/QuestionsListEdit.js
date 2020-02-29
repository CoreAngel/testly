import React, { useState } from 'react';
import { createQuestionsProps } from 'utils/propTypes';
import PropTypes from 'prop-types';
import QuestionEdit from 'components/QuestionEdit';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { changeAnswerPosition, changeQuestionPosition, deleteAnswer, deleteQuestion } from 'redux/createReducer';
import BinButton from 'components/BinButton';
import { typesDnD } from 'utils/dragAndDrop';
import { Container, InvisiblePlaceholder } from './QuestionsListEdit.style';

const QuestionsListEdit = ({
    questions,
    deleteQuestionAction,
    changeAnswerPositionAction,
    changeQuestionPositionAction,
    deleteAnswerAction,
}) => {
    const [isVisibleBin, setIsVisibleBin] = useState(false);
    const [draggableType, setDraggableType] = useState(null);

    const onBeforeCapture = () => {
        setIsVisibleBin(true);
    };

    const onDragStart = result => {
        const {
            source: { droppableId },
        } = result;
        setDraggableType(droppableId);
    };

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;
        // console.log(result);
        if (!destination) {
            setIsVisibleBin(false);
            return;
        }

        const { droppableId: destinationId, index: destinationIndex } = destination;
        const { droppableId: sourceId, index: sourceIndex } = source;

        const isPositionChanged = destinationIndex !== sourceIndex;
        const isQuestionsDnD = source.droppableId === destinationId && sourceId === typesDnD.Questions;
        if (isQuestionsDnD && isPositionChanged) {
            changeQuestionPositionAction({
                target: sourceIndex,
                destination: destinationIndex,
            });
        }

        const isAnswersDnD = sourceId === destinationId && sourceId.startsWith(typesDnD.Answers);
        if (isAnswersDnD && isPositionChanged) {
            const questionPosition = draggableId.split('-')[1];
            changeAnswerPositionAction({
                question: Number.parseInt(questionPosition, 10),
                target: sourceIndex,
                destination: destinationIndex,
            });
        }

        const isBinDnD = destinationId === typesDnD.Bin;
        if (isBinDnD) {
            const isQuestionsSource = sourceId === typesDnD.Questions;
            if (isQuestionsSource) {
                deleteQuestionAction(sourceIndex);
            }

            const isAnswersSource = sourceId.startsWith(typesDnD.Answers);
            if (isAnswersSource) {
                const [, questionId] = draggableId.split('-');
                deleteAnswerAction({
                    question: questionId,
                    target: sourceIndex,
                });
            }
        }

        setIsVisibleBin(false);
    };

    const isQuestionDroppableDisable = draggableType !== typesDnD.Questions;

    return (
        <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
                                        questionId={questionId}
                                        position={index}
                                        question={item}
                                    />
                                );
                            })}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
            <Droppable droppableId={typesDnD.Bin}>
                {(provided, { isDraggingOver }) => (
                    <>
                        <BinButton
                            ref={provided.innerRef}
                            isVisible={isVisibleBin}
                            isActive={isDraggingOver}
                            {...provided.droppableProps}
                        />
                        <InvisiblePlaceholder>{provided.placeholder}</InvisiblePlaceholder>
                    </>
                )}
            </Droppable>
        </DragDropContext>
    );
};

QuestionsListEdit.propTypes = {
    questions: createQuestionsProps.isRequired,
    deleteQuestionAction: PropTypes.func.isRequired,
    deleteAnswerAction: PropTypes.func.isRequired,
    changeAnswerPositionAction: PropTypes.func.isRequired,
    changeQuestionPositionAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    changeAnswerPositionAction: changeAnswerPosition,
    changeQuestionPositionAction: changeQuestionPosition,
    deleteQuestionAction: deleteQuestion,
    deleteAnswerAction: deleteAnswer,
};

export default connect(null, mapDispatchToProps)(QuestionsListEdit);
