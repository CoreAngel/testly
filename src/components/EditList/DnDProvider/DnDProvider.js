import React, { useContext, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DnDContext } from 'components/EditList/DnDProvider/DndContext';
import { ActionsContext } from 'components/EditList/ActionsContext';
import { childrenProps } from 'utils/propTypes';
import { typesDnD } from 'utils/dragAndDrop';

const DnDProvider = ({ children }) => {
    const [isBinOpen, setIsBinOpen] = useState(false);
    const [draggableType, setDraggableType] = useState(null);
    const { changeQuestionPosition, changeAnswerPosition, deleteQuestion, deleteAnswer } = useContext(ActionsContext);

    const onBeforeCapture = () => {
        setIsBinOpen(true);
    };

    const onDragStart = result => {
        const {
            source: { droppableId },
        } = result;
        setDraggableType(droppableId);
    };

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            setIsBinOpen(false);
            return;
        }

        const { droppableId: destinationId, index: destinationIndex } = destination;
        const { droppableId: sourceId, index: sourceIndex } = source;

        const isPositionChanged = destinationIndex !== sourceIndex;
        const isQuestionsDnD = source.droppableId === destinationId && sourceId === typesDnD.Questions;
        if (isQuestionsDnD && isPositionChanged) {
            changeQuestionPosition({
                target: sourceIndex,
                destination: destinationIndex,
            });
        }

        const isAnswersDnD = sourceId === destinationId && sourceId.startsWith(typesDnD.Answers);
        if (isAnswersDnD && isPositionChanged) {
            const questionPosition = draggableId.split('-')[1];
            changeAnswerPosition({
                question: Number.parseInt(questionPosition, 10),
                target: sourceIndex,
                destination: destinationIndex,
            });
        }

        const isBinDnD = destinationId === typesDnD.Bin;
        if (isBinDnD) {
            const isQuestionsSource = sourceId === typesDnD.Questions;
            if (isQuestionsSource) {
                deleteQuestion(sourceIndex);
            }

            const isAnswersSource = sourceId.startsWith(typesDnD.Answers);
            if (isAnswersSource) {
                const [, questionId] = draggableId.split('-');
                deleteAnswer({
                    question: questionId,
                    target: sourceIndex,
                });
            }
        }

        setIsBinOpen(false);
    };

    return (
        <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <DnDContext.Provider
                value={{
                    isBinOpen,
                    draggableType,
                }}
            >
                {children}
            </DnDContext.Provider>
        </DragDropContext>
    );
};

DnDProvider.propTypes = {
    children: childrenProps.isRequired,
};

export default DnDProvider;
