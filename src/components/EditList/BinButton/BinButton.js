import React, { useContext } from 'react';
import { bin } from 'react-icons-kit/ikons/bin';
import { IconStyled, VisibilityHidden } from 'utils/style';
import { Droppable } from 'react-beautiful-dnd';
import { typesDnD } from 'utils/dragAndDrop';
import { DnDContext } from 'components/EditList/DnDProvider';
import { Container, SmallIcon, BigIcon, InvisiblePlaceholder } from './BinButton.style';

const BinButton = () => {
    const { isBinOpen } = useContext(DnDContext);

    return (
        <Droppable droppableId={typesDnD.Bin}>
            {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
                <>
                    <Container ref={innerRef} isVisible={isBinOpen} isActive={isDraggingOver} {...droppableProps}>
                        <VisibilityHidden>Remove element dropdown</VisibilityHidden>
                        <SmallIcon isVisible={isBinOpen} isActive={isDraggingOver}>
                            <IconStyled icon={bin} size={20} />
                        </SmallIcon>
                        <BigIcon isActive={isDraggingOver}>
                            <IconStyled icon={bin} size={32} />
                        </BigIcon>
                    </Container>
                    <InvisiblePlaceholder>{placeholder}</InvisiblePlaceholder>
                </>
            )}
        </Droppable>
    );
};

export default BinButton;
