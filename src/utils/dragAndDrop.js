export const typesDnD = {
    Questions: 'questions',
    Answers: 'answers',
    Bin: 'bin',
};

export const dropAnimationStyles = (style, { isDropAnimating, draggingOver, dropAnimation }) => {
    if (!isDropAnimating) {
        return style;
    }

    if (draggingOver !== typesDnD.Bin) {
        return style;
    }

    const { curve, duration } = dropAnimation;
    return {
        ...style,
        transform: 'scale(0)',
        opacity: 0,
        transition: `all ${curve} ${duration}s`,
    };
};
