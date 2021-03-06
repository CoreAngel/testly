import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ic_menu as menu } from 'react-icons-kit/md/ic_menu';
import { dropAnimationStyles, typesDnD } from 'utils/dragAndDrop';
import RadioSelect from 'components/RadioSelect';
import TextInput from 'components/TextInput';
import { Draggable } from 'react-beautiful-dnd';
import { answerTypeAsString } from 'static/list';
import { colors } from 'utils/colors';
import { editAnswerProp } from 'utils/propTypes';
import { IconStyled } from 'utils/style';
import { answerTypeToStringType, answerStringTypeToType } from 'utils/list';
import useDebounce from 'hooks/useDebounce';
import { ActionsContext } from 'components/EditList/ActionsContext';
import InputErrorWrapper from 'components/EditList/InputErrorWrapper';
import { Container, Reorder, Wrapper, RadioWrapper, InnerWrapper } from './Answer.style';

const radioItems = [
    {
        label: 'Correct',
        value: answerTypeAsString.Correct,
        color: colors.Green,
    },
    {
        label: 'Not Sure',
        value: answerTypeAsString.NotSure,
        color: colors.Yellow,
    },
    {
        label: 'Incorrect',
        value: answerTypeAsString.Incorrect,
        color: colors.Red,
    },
];

const Answer = ({ answer: { lId: answerId, i: item, c: correct, errors, warnings }, questionId, position }) => {
    const [state, setState] = useState({ lId: answerId, i: item, c: correct });
    const prevDebouncedState = useRef(state);
    const { setAnswer, debounce } = useContext(ActionsContext);
    const debouncedState = useDebounce(state, debounce);

    const radioValue = answerTypeToStringType(correct);

    const handleTextChange = ({ target }) => {
        setState(prev => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleRadioChange = ({ value }) => {
        setState(prev => ({
            ...prev,
            c: answerStringTypeToType(value),
        }));
    };

    const compareStates = (firstState, secondState) => {
        return firstState.lId !== secondState.lId || firstState.i !== secondState.i || firstState.c !== secondState.c;
    };

    useEffect(() => {
        const isTyping = state !== debouncedState;
        const localStateChanged = compareStates(debouncedState, prevDebouncedState.current);
        const propsAreDifferentThanState = compareStates(state, { lId: answerId, i: item, c: correct });

        if (!isTyping && !localStateChanged && propsAreDifferentThanState) {
            setState({ lId: answerId, i: item, c: correct });
        } else if (localStateChanged && propsAreDifferentThanState) {
            prevDebouncedState.current = debouncedState;
            setAnswer({
                idQuestion: Number.parseInt(questionId, 10),
                idAnswer: Number.parseInt(answerId, 10),
                answer: debouncedState,
            });
        }
    }, [answerId, item, correct, questionId, state, debouncedState, setAnswer]);

    return (
        <Draggable
            key={`${questionId}-${answerId}`}
            draggableId={`${typesDnD.Answers}-${questionId}-${answerId}`}
            index={position}
        >
            {({ draggableProps, innerRef, dragHandleProps }, snapshot) => (
                <Container
                    ref={innerRef}
                    {...draggableProps}
                    style={dropAnimationStyles(draggableProps.style, snapshot)}
                >
                    <InputErrorWrapper item={{ errors, warnings }}>
                        <Wrapper>
                            <InnerWrapper>
                                <Reorder {...dragHandleProps}>
                                    <IconStyled icon={menu} size={22} />
                                </Reorder>
                                <RadioWrapper>
                                    <RadioSelect
                                        name={questionId}
                                        items={radioItems}
                                        visibleLabel={false}
                                        direction="horizontal"
                                        value={radioValue}
                                        onChange={handleRadioChange}
                                    />
                                </RadioWrapper>
                            </InnerWrapper>
                            <TextInput onChange={handleTextChange} value={state.i} name="i" placeholder="Answer" />
                        </Wrapper>
                    </InputErrorWrapper>
                </Container>
            )}
        </Draggable>
    );
};

Answer.propTypes = {
    answer: editAnswerProp.isRequired,
    questionId: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
};

export default memo(Answer);
